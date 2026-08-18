import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const root = process.cwd();
const packages = [
  'core',
  'storage',
  'fsm',
  'kernel',
  'harness',
  'models',
  'inference',
  'memory',
  'skills',
  'tools',
  'mcp',
  'domain',
  'adapters-local',
  'serving-cache',
  'testing',
];

const packageDescriptions = {
  core: [
    'Shared contracts, schemas, Events, policy and runtime ports.',
    '共享契约、Schema、Event、Policy 与运行时 Port。',
  ],
  storage: [
    'Provider-neutral storage topology contracts and profile builders.',
    'Provider-neutral 存储拓扑契约与 Profile Builder。',
  ],
  fsm: [
    'FSM specifications, topology analysis, snapshots, transitions and recovery.',
    'FSM Spec、拓扑分析、Snapshot、迁移与恢复。',
  ],
  kernel: [
    'ReAct Agent specification and kernel composition contracts.',
    'ReAct Agent Spec 与 Kernel 组合契约。',
  ],
  harness: [
    'Event-first execution, tracing, projection, replay and orchestration.',
    'Event-first 执行、追踪、投影、重放与编排。',
  ],
  models: [
    'Model provider registry, routing and deterministic mock providers.',
    '模型 Provider Registry、路由与确定性 Mock Provider。',
  ],
  inference: [
    'Provider-neutral inference requests, routing, control and streaming.',
    'Provider-neutral 推理请求、路由、控制与流式处理。',
  ],
  memory: [
    'Memory contracts, pipelines, policy, stores, retrieval and evaluation.',
    'Memory 契约、Pipeline、Policy、Store、检索与评估。',
  ],
  skills: [
    'Versioned Skill definitions and progressive-loading registry.',
    '版本化 Skill 定义与渐进加载 Registry。',
  ],
  tools: [
    'Tool contracts, registries, governed execution and workspace boundaries.',
    'Tool 契约、Registry、受控执行与 Workspace 边界。',
  ],
  mcp: [
    'MCP integration specs, clients, policy and lifecycle management.',
    'MCP 集成 Spec、Client、Policy 与生命周期管理。',
  ],
  domain: [
    'Domain Pack validation and compilation into runtime-owned contracts.',
    'Domain Pack 校验及向运行时契约的编译。',
  ],
  'adapters-local': [
    'Local-first SQLite, vector, artifact and runtime adapters.',
    'Local-first SQLite、Vector、Artifact 与 Runtime Adapter。',
  ],
  'serving-cache': [
    'Serving cache keys, stores, policies and cache coordination.',
    'Serving Cache Key、Store、Policy 与缓存协调。',
  ],
  testing: [
    'Trace, replay, fixture and deterministic assertion helpers.',
    'Trace、Replay、Fixture 与确定性断言辅助工具。',
  ],
};

const roots = packages.map((name) => path.join(root, 'packages', name, 'dist', 'index.d.ts'));
const missing = roots.filter((entry) => !fs.existsSync(entry));
if (missing.length > 0) {
  throw new Error(
    `Missing declaration entrypoints. Run npm run build:packages first:\n${missing.join('\n')}`
  );
}

const program = ts.createProgram(roots, {
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.NodeNext,
  moduleResolution: ts.ModuleResolutionKind.NodeNext,
  skipLibCheck: true,
});
const checker = program.getTypeChecker();

for (const language of ['en', 'zh']) {
  const outputDirectory = path.join(
    root,
    'website',
    ...(language === 'zh' ? ['zh', 'api'] : ['api'])
  );
  fs.mkdirSync(outputDirectory, { recursive: true });
  fs.writeFileSync(path.join(outputDirectory, 'index.md'), renderIndex(language));

  for (const packageName of packages) {
    fs.writeFileSync(
      path.join(outputDirectory, `${packageName}.md`),
      renderPackage(packageName, language)
    );
  }
}

process.stdout.write(
  `Generated bilingual API indexes and module pages for ${packages.length} packages.\n`
);

function renderIndex(language) {
  const zh = language === 'zh';
  const prefix = zh ? '/zh' : '';
  const lines = [
    `# ${zh ? '完整 API 参考' : 'Complete API reference'}`,
    '',
    zh
      ? '这里记录当前 Hypha npm 包入口的全部公共导出，并按包与源码模块拆分。每个模块说明自身用途与入口导入方式；每个 Symbol 条目包含 TypeScript 声明、源码位置、函数参数与返回类型，或类、接口和枚举的公开成员。'
      : 'This reference documents every public export from the current Hypha npm package entrypoints, grouped by package and source module. Each module explains its purpose and entrypoint imports; each symbol entry includes its TypeScript declaration, source location, function parameters and return type, or the public members of its class, interface, or enum.',
    '',
    `> ${zh ? '生成依据' : 'Source of record'}: ${zh ? '页面由构建后的 TypeScript 声明通过' : 'These pages are generated from built TypeScript declarations by'} \`npm run docs:api\`${zh ? '生成。函数、类、接口、类型与枚举保留完整声明；编译器展开后超过 4,000 字符的常量推导类型会压缩显示，并保留源码链接。' : '. Functions, classes, interfaces, types and enums retain complete declarations. Compiler-expanded constant types longer than 4,000 characters are compacted for readability and retain a source link.'}`,
    '',
    `## ${zh ? '包索引' : 'Package index'}`,
    '',
    `| ${zh ? '包' : 'Package'} | ${zh ? 'API 范围' : 'API scope'} |`,
    '| --- | --- |',
    ...packages.map((name) => {
      const description = packageDescriptions[name][zh ? 1 : 0];
      return `| [\`@codesoul-co/hypha-${name}\`](${prefix}/api/${name}) | ${description} |`;
    }),
    '',
    `## ${zh ? '公共 API 边界' : 'Public API boundary'}`,
    '',
    zh
      ? '- 公共入口导出的 Symbol 才属于本索引；源码中的非导出实现不是公共 API。\n- TypeScript 类型会在运行时擦除；不可信输入仍应使用对应的 Zod/Spec Definition 解析。\n- Tool、MCP、Memory Write、File Write 与 External Write 必须经过 Policy、Trace 与 Harness Hook。\n- Event 是事实来源；Session 与 Run 是可重建的产品/上下文视图。'
      : '- Only symbols exported by a package entrypoint are listed; non-exported source implementation is not public API.\n- TypeScript types disappear at runtime; parse untrusted input with the corresponding Zod/spec definition.\n- Tool, MCP, memory, file and external writes must pass through policy, trace and harness hooks.\n- Events are the source of truth; Session and Run are rebuildable product/context views.',
    '',
  ];
  return lines.join('\n');
}

function renderPackage(packageName, language) {
  const zh = language === 'zh';
  const prefix = zh ? '/zh' : '';
  const entry = program.getSourceFile(
    path.join(root, 'packages', packageName, 'dist', 'index.d.ts')
  );
  if (!entry?.symbol) throw new Error(`Cannot resolve exports for ${packageName}`);

  const exports = checker
    .getExportsOfModule(entry.symbol)
    .map((exported) => describeExport(packageName, exported))
    .sort(compareExports);
  const modules = Map.groupBy(exports, (item) => item.module);
  const counts = countKinds(exports);
  const packageLabel = `@codesoul-co/hypha-${packageName}`;
  const packageDirectory = path.join(
    root,
    'website',
    ...(zh ? ['zh', 'api', packageName] : ['api', packageName])
  );
  fs.rmSync(packageDirectory, { recursive: true, force: true });
  fs.mkdirSync(packageDirectory, { recursive: true });
  for (const [moduleName, items] of modules.entries()) {
    const moduleFile = path.join(packageDirectory, `${modulePagePath(moduleName)}.md`);
    fs.mkdirSync(path.dirname(moduleFile), { recursive: true });
    fs.writeFileSync(moduleFile, renderModulePage(packageName, moduleName, items, language));
  }
  const lines = [
    `# \`${packageLabel}\` ${zh ? 'API' : 'API'}`,
    '',
    packageDescriptions[packageName][zh ? 1 : 0],
    '',
    `- ${zh ? '安装' : 'Install'}: \`npm install ${packageLabel}@1.0.1\``,
    `- ${zh ? '入口导入' : 'Entrypoint import'}: \`import { ... } from '${packageLabel}';\``,
    `- ${zh ? '公共导出' : 'Public exports'}: **${exports.length}**`,
    `- ${zh ? '源码模块' : 'Source modules'}: **${modules.size}**`,
    '',
    `## ${zh ? '导出概览' : 'Export overview'}`,
    '',
    `| ${zh ? '种类' : 'Kind'} | ${zh ? '数量' : 'Count'} |`,
    '| --- | ---: |',
    ...Object.entries(counts).map(([kind, count]) => `| ${kindLabel(kind, language)} | ${count} |`),
    '',
    `## ${zh ? '源码模块' : 'Source modules'}`,
    '',
    `| ${zh ? '模块' : 'Module'} | ${zh ? '用途' : 'Use when'} | ${zh ? '导出数' : 'Exports'} | ${zh ? '源码' : 'Source'} |`,
    '| --- | --- | ---: | --- |',
    ...[...modules.entries()].map(([moduleName, items]) => {
      return `| [\`${moduleName}\`](${prefix}/api/${packageName}/${modulePagePath(moduleName)}) | ${escapeTable(modulePurpose(packageName, moduleName, items, language))} | ${items.length} | [source](${sourceUrl(packageName, moduleName)}) |`;
    }),
    '',
    `## ${zh ? '导入边界' : 'Import boundary'}`,
    '',
    zh
      ? `本页只记录 \`${packageLabel}\` 包入口导出的公共 API。\`packages/${packageName}/src\` 中未由入口导出的实现不属于该 npm 包的公共契约。`
      : `This page documents only the public API exported by the \`${packageLabel}\` package entrypoint. Implementations under \`packages/${packageName}/src\` that are not exported from that entrypoint are not part of the npm package contract.`,
    '',
  ];
  return lines.join('\n');
}

function modulePurpose(packageName, moduleName, items, language) {
  const zh = language === 'zh';
  if (moduleName === 'index') {
    return zh
      ? `聚合 \`@codesoul-co/hypha-${packageName}\` 的公共入口导出；应用应从包入口导入这些 Symbol，不应依赖内部文件路径。`
      : `Aggregates the public entrypoint exports for \`@codesoul-co/hypha-${packageName}\`; applications import these symbols from the package entrypoint instead of internal file paths.`;
  }

  const subject = humanize(moduleName.split('/').at(-1));
  const lowerName = moduleName.toLowerCase();
  const categories = [
    [
      ['schema', 'spec', 'contract', 'types'],
      '声明并运行时校验契约',
      'declaring and runtime-validating contracts',
    ],
    [
      ['port'],
      '定义或实现 Provider-neutral Port',
      'defining or implementing provider-neutral ports',
    ],
    [
      ['workspace'],
      '声明并实施 Workspace 作用域边界',
      'declaring and enforcing workspace scope boundaries',
    ],
    [
      ['secret'],
      '传递受控 Secret 引用与解析契约',
      'passing governed secret references and resolution contracts',
    ],
    [
      ['media'],
      '声明 Tool 的文本、图像、音频与二进制输入输出',
      'declaring text, image, audio, and binary Tool inputs and outputs',
    ],
    [
      ['family'],
      '声明并解析 Tool Family 能力集合',
      'declaring and resolving Tool Family capability sets',
    ],
    [['event'], '创建、记录或读取 Event 契约', 'creating, recording, or reading Event contracts'],
    [
      ['adapter', 'provider', 'client'],
      '把外部或本地 Provider 绑定到 Hypha Port',
      'binding external or local providers to Hypha ports',
    ],
    [
      ['store', 'repository', 'persistence'],
      '持久化并读取该边界的数据',
      'persisting and reading data at this boundary',
    ],
    [
      ['registry', 'catalog'],
      '注册并解析版本化能力或实现',
      'registering and resolving versioned capabilities or implementations',
    ],
    [
      ['runtime', 'runner', 'executor', 'execution'],
      '执行该边界的运行时行为',
      'executing runtime behavior at this boundary',
    ],
    [['policy', 'governance'], '实施 Policy 与治理检查', 'applying policy and governance checks'],
    [
      ['recovery', 'retry', 'circuit'],
      '处理有界恢复、重试或降级',
      'handling bounded recovery, retry, or degradation',
    ],
    [['cache'], '读写或协调缓存状态', 'reading, writing, or coordinating cache state'],
    [
      ['test', 'fixture', 'assert'],
      '编写确定性测试与契约断言',
      'writing deterministic tests and contract assertions',
    ],
    [
      ['error', 'failure'],
      '规范化、分类或暴露错误契约',
      'normalizing, classifying, or exposing error contracts',
    ],
  ];
  const category = categories.find(([needles]) =>
    needles.some((needle) => lowerName.includes(needle))
  );
  const activity =
    category?.[zh ? 1 : 2] ??
    (zh
      ? '使用该功能边界的公共契约与操作'
      : 'using the public contracts and operations for this capability boundary');
  const shape = countKinds(items);
  const shapeSummary = Object.entries(shape)
    .map(([kind, count]) => kindCount(kind, count, language))
    .join(zh ? '、' : ', ');
  return zh
    ? `用于${activity}。${subject} 模块公开 ${shapeSummary}。`
    : `Use the ${subject} module for ${activity}. It exports ${shapeSummary}.`;
}

function moduleImportExample(packageLabel, items, language) {
  const runtimeItems = items
    .filter((item) => item.kind !== 'interface' && item.kind !== 'type')
    .slice(0, 8);
  const typeItems = items
    .filter((item) => item.kind === 'interface' || item.kind === 'type')
    .slice(0, 8);
  const lines = [];
  if (runtimeItems.length > 0) {
    lines.push(
      'import {',
      ...runtimeItems.map((item) => `  ${item.name},`),
      `} from '${packageLabel}';`
    );
  }
  if (typeItems.length > 0) {
    if (lines.length > 0) lines.push('');
    lines.push(
      'import type {',
      ...typeItems.map((item) => `  ${item.name},`),
      `} from '${packageLabel}';`
    );
  }
  if (runtimeItems.length + typeItems.length < items.length) {
    lines.push(
      '',
      language === 'zh'
        ? '// 完整导出列表见下方。'
        : '// The complete export list is documented below.'
    );
  }
  return lines.join('\n');
}

function moduleUsageNotes(packageName, items, language) {
  const zh = language === 'zh';
  const lines = [`### ${zh ? '使用要点' : 'Usage patterns'}`, ''];
  const typeCount = items.filter(
    (item) => item.kind === 'interface' || item.kind === 'type'
  ).length;
  const classCount = items.filter((item) => item.kind === 'class').length;
  const functionCount = items.filter((item) => item.kind === 'function').length;
  const valueCount = items.filter((item) => ['constant', 'enum'].includes(item.kind)).length;
  const schema = items.find(
    (item) =>
      item.kind === 'constant' &&
      item.name.endsWith('Schema') &&
      !item.name.endsWith('JsonSchema') &&
      item.signature.includes('z.')
  );

  if (typeCount > 0) {
    lines.push(
      zh
        ? `- ${typeCount} 个类型/接口用于应用代码、Adapter 或测试中的静态契约；请使用 \`import type\`，运行时不应依赖它们。`
        : `- Use the ${typeCount} type/interface ${typeCount === 1 ? 'export' : 'exports'} as static contracts in application code, adapters, or tests. Import them with \`import type\`; they do not exist at runtime.`
    );
  }
  if (classCount > 0) {
    lines.push(
      zh
        ? `- ${classCount} 个类提供可实例化的运行时实现；构造参数与公开方法在各自条目中完整列出。`
        : `- The module exposes ${kindCount('class', classCount, language)} as constructable runtime implementations. Each symbol entry lists its constructor and public methods.`
    );
  }
  if (functionCount > 0) {
    lines.push(
      zh
        ? `- ${functionCount} 个函数是该模块的直接操作入口；每个 overload 的必需/可选参数与返回类型均在下方列出。`
        : `- The module exposes ${kindCount('function', functionCount, language)} as direct operation entrypoints. Every overload, required/optional parameter, and return type is documented below.`
    );
  }
  if (valueCount > 0) {
    lines.push(
      zh
        ? `- ${valueCount} 个常量/枚举提供稳定值、Schema、Definition 或默认配置；应复用这些导出，避免在应用中复制内部值。`
        : `- The ${valueCount} constant/enum ${valueCount === 1 ? 'export provides' : 'exports provide'} stable values, schemas, definitions, or defaults. Reuse these exports instead of copying internal values into an application.`
    );
  }
  lines.push('');
  if (schema) {
    lines.push(
      `### ${zh ? '运行时校验示例' : 'Runtime validation example'}`,
      '',
      '```ts',
      `import { ${schema.name} } from '@codesoul-co/hypha-${packageName}';`,
      '',
      'declare function loadExternalInput(): unknown;',
      'const input: unknown = loadExternalInput();',
      `const parsed = ${schema.name}.parse(input);`,
      '```',
      '',
      zh
        ? '配置、网络请求或持久化数据等不可信输入应先通过 Runtime Schema，再传给只接受已校验契约的函数或类。'
        : 'Parse untrusted configuration, network, or persisted input with the runtime schema before passing it to functions or classes that expect a validated contract.'
    );
  }
  return lines;
}

function renderModulePage(packageName, moduleName, items, language) {
  const zh = language === 'zh';
  const prefix = zh ? '/zh' : '';
  const packageLabel = `@codesoul-co/hypha-${packageName}`;
  const lines = [
    `# \`${packageLabel}\` / \`${moduleName}\``,
    '',
    `- ${zh ? '包索引' : 'Package index'}: [\`${packageLabel}\`](${prefix}/api/${packageName})`,
    `- ${zh ? '源码' : 'Source'}: [\`packages/${packageName}/src/${sourcePath(moduleName)}\`](${sourceUrl(packageName, moduleName)})`,
    `- ${zh ? '导出数' : 'Exports'}: **${items.length}**`,
    '',
    `## ${zh ? '模块用法' : 'Using this module'}`,
    '',
    modulePurpose(packageName, moduleName, items, language),
    '',
    `### ${zh ? '从包入口导入' : 'Import from the package entrypoint'}`,
    '',
    '```ts',
    moduleImportExample(packageLabel, items, language),
    '```',
    '',
    ...moduleUsageNotes(packageName, items, language),
    '',
    `## ${zh ? '公共导出' : 'Public exports'}`,
    '',
    `| ${zh ? 'Symbol' : 'Symbol'} | ${zh ? '种类' : 'Kind'} | ${zh ? '签名' : 'Signature'} | ${zh ? '说明' : 'Description'} |`,
    '| --- | --- | --- | --- |',
  ];
  for (const item of items) {
    lines.push(
      `| \`${escapeCode(item.name)}\` | ${kindLabel(item.kind, language)} | <code>${escapeHtml(item.signature)}</code> | ${escapeTable(item.description || fallbackDescription(item, language))} |`
    );
  }
  lines.push('');

  for (const item of items) {
    lines.push(`## \`${item.name}\``, '');
    lines.push(item.description || fallbackDescription(item, language), '');
    lines.push(
      `- ${zh ? '种类' : 'Kind'}: ${kindLabel(item.kind, language)}`,
      `- ${zh ? '导入' : 'Import'}: \`${importStatement(packageLabel, item)}\``,
      `- ${zh ? '源码模块' : 'Source module'}: [\`${moduleName}\`](${sourceUrl(packageName, moduleName)})`,
      '',
      `### ${zh ? '声明' : 'Declaration'}`,
      '',
      '```text',
      declarationForDisplay(item, language),
      '```',
      ''
    );
    if (isCompactedDeclaration(item)) {
      lines.push(
        zh
          ? '> 该常量的编译器展开类型已压缩；它的公共名称、顶层类型与源码位置仍保留在本条目中。相关输入/输出字段请使用同模块导出的接口、类型或 Runtime Schema。'
          : '> This compiler-expanded constant type is compacted. Its public name, top-level type, and source location remain here; use the module’s exported interfaces, types, or runtime schema for input/output fields.',
        ''
      );
    }

    for (const [index, callable] of item.callSignatures.entries()) {
      const overload = item.callSignatures.length > 1 ? ` ${index + 1}` : '';
      lines.push(
        `### ${zh ? '调用签名' : 'Call signature'}${overload}`,
        '',
        '```text',
        `${item.name}${callable.signature}`,
        '```',
        ''
      );
      if (callable.description) lines.push(callable.description, '');
      lines.push(`#### ${zh ? '参数' : 'Parameters'}`, '');
      if (callable.parameters.length === 0) {
        lines.push(zh ? '无参数。' : 'No parameters.', '');
      } else {
        lines.push(
          `| ${zh ? '参数' : 'Parameter'} | ${zh ? '类型' : 'Type'} | ${zh ? '必需' : 'Required'} | ${zh ? '说明' : 'Description'} |`,
          '| --- | --- | --- | --- |'
        );
        for (const parameter of callable.parameters) {
          lines.push(
            `| \`${escapeCode(parameter.name)}\` | <code>${escapeHtml(parameter.type)}</code> | ${parameter.optional ? (zh ? '否' : 'No') : zh ? '是' : 'Yes'} | ${escapeTable(parameter.description || fallbackParameterDescription(parameter, language))} |`
          );
        }
        lines.push('');
      }
      lines.push(
        `#### ${zh ? '返回值' : 'Returns'}`,
        '',
        `- ${zh ? '类型' : 'Type'}: \`${escapeInlineCode(callable.returnType)}\``,
        `- ${zh ? '说明' : 'Description'}: ${callable.returnDescription || fallbackReturnDescription(callable, language)}`,
        ''
      );
    }

    if (item.members.length === 0) continue;
    lines.push(
      `### ${zh ? (item.kind === 'interface' ? '契约成员' : '公开成员') : item.kind === 'interface' ? 'Contract members' : 'Public members'}`,
      '',
      `| ${zh ? '成员' : 'Member'} | ${zh ? '种类' : 'Kind'} | ${zh ? '签名' : 'Signature'} | ${zh ? '说明' : 'Description'} |`,
      '| --- | --- | --- | --- |'
    );
    for (const member of item.members) {
      lines.push(
        `| \`${escapeCode(member.name)}\` | ${kindLabel(member.kind, language)} | <code>${escapeHtml(member.signature)}</code> | ${escapeTable(member.description || fallbackMemberDescription(member, language))} |`
      );
    }
    lines.push('');
  }
  return lines.join('\n');
}

function describeExport(packageName, exported) {
  let target = exported;
  if (exported.flags & ts.SymbolFlags.Alias) {
    try {
      target = checker.getAliasedSymbol(exported);
    } catch {
      target = exported;
    }
  }
  const declaration =
    target.valueDeclaration ?? target.declarations?.[0] ?? exported.declarations?.[0];
  const kind = symbolKind(target, declaration);
  return {
    name: exported.getName(),
    packageName,
    kind,
    module: declarationModule(packageName, declaration),
    signature: symbolSignature(exported.getName(), target, declaration, kind),
    declaration: symbolDeclaration(exported.getName(), target, declaration, kind),
    description: documentation(target),
    callSignatures: kind === 'function' ? callableSignatures(target, declaration) : [],
    members:
      kind === 'class'
        ? classMembers(target)
        : kind === 'interface'
          ? interfaceMembers(target)
          : kind === 'enum'
            ? enumMembers(target)
            : [],
  };
}

function symbolDeclaration(name, symbol, declaration, kind) {
  const declarations = (symbol.declarations ?? []).filter(
    (entry) => declarationModuleFromFile(entry.getSourceFile().fileName) !== 'index'
  );
  const selected = declarations.length > 0 ? declarations : declaration ? [declaration] : [];
  if (kind === 'class' && declaration && ts.isClassDeclaration(declaration)) {
    const declarationText = declaration.getText();
    const bodyStart = declarationText.indexOf('{');
    const header = bodyStart >= 0 ? declarationText.slice(0, bodyStart).trim() : `class ${name}`;
    const publicMembers = declaration.members.filter(
      (member) => !hasPrivateOrProtectedModifier(member)
    );
    return [
      `${header} {`,
      ...publicMembers.flatMap((member) =>
        member
          .getText()
          .split('\n')
          .map((line) => `    ${line}`)
      ),
      '}',
    ].join('\n');
  }
  if (
    selected.length > 0 &&
    ['function', 'class', 'interface', 'type', 'enum', 'namespace'].includes(kind)
  ) {
    return selected
      .map((entry) => entry.getText().trim())
      .filter(Boolean)
      .join('\n\n');
  }
  const signature = symbolSignature(name, symbol, declaration, kind);
  return kind === 'constant' ? `export declare ${signature};` : signature;
}

function symbolKind(symbol, declaration) {
  if (symbol.flags & ts.SymbolFlags.Class) return 'class';
  if (symbol.flags & ts.SymbolFlags.Function) return 'function';
  if (symbol.flags & ts.SymbolFlags.Interface) return 'interface';
  if (symbol.flags & ts.SymbolFlags.TypeAlias) return 'type';
  if (symbol.flags & ts.SymbolFlags.Enum) return 'enum';
  if (symbol.flags & ts.SymbolFlags.Module) return 'namespace';
  if (symbol.flags & ts.SymbolFlags.Variable) return 'constant';
  if (declaration && ts.isFunctionDeclaration(declaration)) return 'function';
  return 'other';
}

function symbolSignature(name, symbol, declaration, kind) {
  const flags =
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
  if (kind === 'function') {
    const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
    const signatures = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
    return signatures
      .map((signature) => `${name}${checker.signatureToString(signature, declaration, flags)}`)
      .join(' | ');
  }
  if (kind === 'class') {
    const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
    const constructors = checker.getSignaturesOfType(type, ts.SignatureKind.Construct);
    return constructors.length > 0
      ? constructors
          .map(
            (signature) => `new ${name}${checker.signatureToString(signature, declaration, flags)}`
          )
          .join(' | ')
      : `class ${name}`;
  }
  if (kind === 'interface') {
    const heritage = declaration?.heritageClauses
      ?.map((clause) => clause.getText().replace(/\s+/g, ' '))
      .join(' ');
    return `interface ${name}${heritage ? ` ${heritage}` : ''}`;
  }
  if (kind === 'enum') return `enum ${name}`;
  if (kind === 'namespace') return `namespace ${name}`;
  if (kind === 'type' && declaration && ts.isTypeAliasDeclaration(declaration)) {
    return `type ${name} = ${declaration.type.getText().replace(/\s+/g, ' ')}`;
  }
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const rendered = checker.typeToString(type, declaration, flags);
  return `${kind === 'type' ? 'type' : 'const'} ${name}: ${rendered}`;
}

function callableSignatures(symbol, declaration) {
  if (!declaration) return [];
  const flags =
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
  const type = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  return checker.getSignaturesOfType(type, ts.SignatureKind.Call).map((signature) => {
    const predicate = checker.getTypePredicateOfSignature(signature);
    return {
      signature: checker.signatureToString(signature, declaration, flags),
      description: ts
        .displayPartsToString(signature.getDocumentationComment(checker))
        .replace(/\s+/g, ' ')
        .trim(),
      parameters: signature.getParameters().map((parameter) => {
        const parameterDeclaration =
          parameter.valueDeclaration ?? parameter.declarations?.[0] ?? declaration;
        const parameterType = checker.getTypeOfSymbolAtLocation(parameter, parameterDeclaration);
        const rest = Boolean(parameterDeclaration.dotDotDotToken);
        return {
          name: `${rest ? '...' : ''}${parameter.getName()}`,
          type: checker.typeToString(parameterType, parameterDeclaration, flags),
          optional:
            Boolean(parameter.flags & ts.SymbolFlags.Optional) ||
            Boolean(parameterDeclaration.questionToken) ||
            Boolean(parameterDeclaration.initializer),
          description: documentation(parameter),
        };
      }),
      returnType: predicate
        ? checker.typePredicateToString(predicate, declaration, flags)
        : checker.typeToString(signature.getReturnType(), declaration, flags),
      returnDescription: jsDocTagText(signature, ['returns', 'return']),
    };
  });
}

function jsDocTagText(signature, names) {
  const tag = signature.getJsDocTags().find((entry) => names.includes(entry.name));
  if (!tag?.text) return '';
  const parts = Array.isArray(tag.text) ? tag.text : [{ text: String(tag.text) }];
  return parts
    .map((part) => part.text)
    .join('')
    .replace(/^\s*-\s*/, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function classMembers(symbol) {
  const declaration = symbol.valueDeclaration ?? symbol.declarations?.[0];
  if (!declaration) return [];
  const instanceType = checker.getDeclaredTypeOfSymbol(symbol);
  const members = checker
    .getPropertiesOfType(instanceType)
    .filter((member) => !isPrivateOrProtected(member))
    .map((member) => describeMember(member, declaration));
  const staticType = checker.getTypeOfSymbolAtLocation(symbol, declaration);
  const staticMembers = checker
    .getPropertiesOfType(staticType)
    .filter((member) => member.getName() !== 'prototype' && !isPrivateOrProtected(member))
    .map((member) => {
      const described = describeMember(member, declaration);
      return {
        ...described,
        name: `static ${member.getName()}`,
        signature: `static ${described.signature}`,
      };
    });
  const constructors = checker
    .getSignaturesOfType(staticType, ts.SignatureKind.Construct)
    .map((signature, index) => ({
      name: index === 0 ? 'constructor' : `constructor overload ${index + 1}`,
      kind: 'constructor',
      signature: checker.signatureToString(signature, declaration, ts.TypeFormatFlags.NoTruncation),
      description: ts.displayPartsToString(signature.getDocumentationComment(checker)),
    }));
  return [...constructors, ...staticMembers, ...members].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
}

function interfaceMembers(symbol) {
  const declaration = symbol.declarations?.[0];
  if (!declaration) return [];
  return checker
    .getPropertiesOfType(checker.getDeclaredTypeOfSymbol(symbol))
    .map((member) => describeMember(member, declaration))
    .sort((a, b) => a.name.localeCompare(b.name));
}

function enumMembers(symbol) {
  const declaration = symbol.declarations?.find(ts.isEnumDeclaration);
  if (!declaration) return [];
  return declaration.members.map((member) => {
    const memberSymbol = checker.getSymbolAtLocation(member.name);
    const name = member.name.getText();
    const value = checker.getConstantValue(member);
    return {
      name,
      kind: 'enum-member',
      signature:
        value === undefined
          ? name
          : `${name} = ${typeof value === 'string' ? JSON.stringify(value) : value}`,
      description: memberSymbol ? documentation(memberSymbol) : '',
    };
  });
}

function describeMember(member, location) {
  const declaration = member.valueDeclaration ?? member.declarations?.[0] ?? location;
  const type = checker.getTypeOfSymbolAtLocation(member, declaration);
  const calls = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  const optional =
    Boolean(member.flags & ts.SymbolFlags.Optional) || Boolean(declaration.questionToken);
  const readonly = Boolean(
    declaration.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ReadonlyKeyword)
  );
  const memberName = `${readonly ? 'readonly ' : ''}${member.getName()}${optional ? '?' : ''}`;
  return {
    name: member.getName(),
    kind: calls.length > 0 ? 'method' : 'property',
    signature:
      calls.length > 0
        ? calls
            .map(
              (signature) =>
                `${memberName}${checker.signatureToString(signature, declaration, ts.TypeFormatFlags.NoTruncation)}`
            )
            .join(' | ')
        : `${memberName}: ${checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation)}`,
    description: documentation(member),
  };
}

function isPrivateOrProtected(symbol) {
  return (symbol.declarations ?? []).some(hasPrivateOrProtectedModifier);
}

function hasPrivateOrProtectedModifier(declaration) {
  return declaration.modifiers?.some(
    (modifier) =>
      modifier.kind === ts.SyntaxKind.PrivateKeyword ||
      modifier.kind === ts.SyntaxKind.ProtectedKeyword
  );
}

function declarationModule(packageName, declaration) {
  if (!declaration) return 'index';
  const dist = path.join(root, 'packages', packageName, 'dist');
  const relative = path
    .relative(dist, declaration.getSourceFile().fileName)
    .replaceAll(path.sep, '/');
  return relative.replace(/\.d\.(?:mts|cts|ts)$/, '') || 'index';
}

function declarationModuleFromFile(fileName) {
  const relative = path.relative(root, fileName).replaceAll(path.sep, '/');
  return (
    relative
      .replace(/\.d\.(?:mts|cts|ts)$/, '')
      .split('/')
      .at(-1) || 'index'
  );
}

function documentation(symbol) {
  return ts
    .displayPartsToString(symbol.getDocumentationComment(checker))
    .replace(/\s+/g, ' ')
    .trim();
}

function compareExports(a, b) {
  return (
    a.module.localeCompare(b.module) || a.kind.localeCompare(b.kind) || a.name.localeCompare(b.name)
  );
}

function countKinds(exports) {
  return exports.reduce((counts, item) => {
    counts[item.kind] = (counts[item.kind] ?? 0) + 1;
    return counts;
  }, {});
}

function kindLabel(kind, language) {
  if (language !== 'zh') return kind;
  return (
    {
      class: '类',
      function: '函数',
      interface: '接口',
      type: '类型',
      enum: '枚举',
      namespace: '命名空间',
      constant: '常量',
      constructor: '构造函数',
      method: '方法',
      property: '属性',
      'enum-member': '枚举成员',
      other: '其他',
    }[kind] ?? kind
  );
}

function kindCount(kind, count, language) {
  const label = kindLabel(kind, language);
  if (language === 'zh' || count === 1) return `${count} ${label}`;
  const plural =
    {
      class: 'classes',
      property: 'properties',
    }[kind] ?? `${label}s`;
  return `${count} ${plural}`;
}

function fallbackDescription(item, language) {
  const subject = humanize(item.name);
  if (item.name.endsWith('SpecDefinition')) {
    const base = humanize(item.name.slice(0, -'SpecDefinition'.length));
    return language === 'zh'
      ? `${base} Spec 的运行时校验入口，组合 Parser、Example 与 JSON Schema。`
      : `Runtime validation entrypoint for the ${base} spec, combining its parser, example and JSON Schema.`;
  }
  if (item.name.endsWith('JsonSchema')) {
    const base = humanize(item.name.slice(0, -'JsonSchema'.length));
    return language === 'zh' ? `${base} 的 JSON Schema。` : `JSON Schema for ${base}.`;
  }
  if (item.name.endsWith('Schema')) {
    const base = humanize(item.name.slice(0, -'Schema'.length));
    return language === 'zh' ? `${base} 的运行时 Schema。` : `Runtime schema for ${base}.`;
  }
  if (item.name.endsWith('Example')) {
    const base = humanize(item.name.slice(0, -'Example'.length));
    return language === 'zh' ? `${base} 的有效示例值。` : `Valid example value for ${base}.`;
  }
  if (item.kind === 'class') {
    return language === 'zh'
      ? `${subject} 类，共公开 ${item.members.length} 个构造函数或成员；精确签名见本条目的声明与成员表。`
      : `${subject} class with ${item.members.length} public constructor or member entries; its exact declarations are listed below.`;
  }
  if (item.kind === 'interface') {
    return language === 'zh'
      ? `${subject} 接口，共包含 ${item.members.length} 个公开字段或方法。`
      : `${subject} interface with ${item.members.length} public fields or methods.`;
  }
  if (item.kind === 'function') {
    const overloads = item.callSignatures.length;
    return language === 'zh'
      ? `${subject} 函数，提供 ${overloads} 个公开调用签名；参数与返回类型见下表。`
      : `${subject} function with ${overloads} public call signature${overloads === 1 ? '' : 's'}; parameters and return types are listed below.`;
  }
  if (item.kind === 'type') {
    return language === 'zh'
      ? `${subject} 公共类型别名；完整类型表达式见声明。`
      : `Public type alias for ${subject}; the declaration contains its complete type expression.`;
  }
  if (item.kind === 'enum') {
    return language === 'zh'
      ? `${subject} 枚举，共包含 ${item.members.length} 个公开成员。`
      : `${subject} enum with ${item.members.length} public members.`;
  }
  return language === 'zh'
    ? `由 \`${item.module}\` 模块导出的 ${subject} ${kindLabel(item.kind, language)}。`
    : `${subject} ${item.kind} exported by the \`${item.module}\` module.`;
}

function fallbackMemberDescription(member, language) {
  if (member.kind === 'constructor') {
    return language === 'zh' ? '创建该类的实例。' : 'Creates an instance of this class.';
  }
  if (member.kind === 'property') {
    return language === 'zh'
      ? '公开属性；类型、只读和可选状态以签名列为准。'
      : 'Public property; its type, readonly modifier and optionality are shown in the signature.';
  }
  if (member.kind === 'enum-member') {
    return language === 'zh'
      ? '枚举成员；显式值或推导值见签名。'
      : 'Enum member; its explicit or inferred value is shown in the signature.';
  }
  return language === 'zh'
    ? '公开方法；参数与返回类型以签名列为准。'
    : 'Public method; parameters and return type are shown in the signature.';
}

function fallbackParameterDescription(parameter, language) {
  const requirement = parameter.optional
    ? language === 'zh'
      ? '可选'
      : 'Optional'
    : language === 'zh'
      ? '必需'
      : 'Required';
  return language === 'zh'
    ? `${requirement}参数；接受的值由类型列定义。`
    : `${requirement} parameter; accepted values are defined by the type column.`;
}

function fallbackReturnDescription(callable, language) {
  if (callable.returnType === 'void') {
    return language === 'zh' ? '不返回值。' : 'Returns no value.';
  }
  return language === 'zh'
    ? '返回值契约由上述类型定义。'
    : 'The return contract is defined by the type shown above.';
}

function importStatement(packageLabel, item) {
  const keyword = item.kind === 'interface' || item.kind === 'type' ? 'import type' : 'import';
  return `${keyword} { ${item.name} } from '${packageLabel}';`;
}

function isCompactedDeclaration(item) {
  return item.kind === 'constant' && item.declaration.length > 4000;
}

function declarationForDisplay(item, language) {
  if (!isCompactedDeclaration(item)) return item.declaration;
  const comment =
    language === 'zh'
      ? '// 精确类型由包入口解析；完整编译器展开定义见源码链接。'
      : '// Exact type resolved from the package entrypoint; see source for the compiler expansion.';
  return `${comment}\nexport declare const ${item.name}: (typeof import('@codesoul-co/hypha-${item.packageName}'))['${item.name}'];`;
}

function humanize(value) {
  const normalized = value
    .replace(/^static /, '')
    .replace(/SpecDefinition$/, ' spec')
    .replace(/JsonSchema$/, ' JSON schema')
    .replace(/Schema$/, ' schema')
    .replace(/Example$/, ' example')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim()
    .replace(/\bSQ Lite\b/g, 'SQLite')
    .replace(/\bRe Act\b/g, 'ReAct')
    .replace(/\bFsm\b/gi, 'FSM')
    .replace(/\bMcp\b/gi, 'MCP')
    .replace(/\bJson\b/gi, 'JSON')
    .replace(/\bApi\b/gi, 'API')
    .replace(/\bId\b/g, 'ID')
    .replace(/\bUrl\b/g, 'URL')
    .replace(/\bUuid\b/gi, 'UUID');
  return normalized ? `${normalized[0].toUpperCase()}${normalized.slice(1)}` : normalized;
}

function sourcePath(moduleName) {
  return `${moduleName === 'index' ? 'index' : moduleName}.ts`;
}

function sourceUrl(packageName, moduleName) {
  return `https://github.com/CodeSoul-co/Hypha/blob/main/packages/${packageName}/src/${sourcePath(moduleName)}`;
}

function modulePagePath(moduleName) {
  return moduleName === 'index' ? 'entrypoint' : moduleName;
}

function escapeCode(value) {
  return value.replaceAll('`', '\\`');
}

function escapeInlineCode(value) {
  return value.replaceAll('`', '\\`').replace(/\s+/g, ' ');
}

function escapeHtml(value) {
  const compact = value.length > 420 ? `${value.slice(0, 417)}...` : value;
  return compact
    .replace(/\s+/g, ' ')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('|', '&#124;');
}

function escapeTable(value) {
  return value.replace(/\s+/g, ' ').replaceAll('|', '\\|').replaceAll('\n', ' ').trim();
}
