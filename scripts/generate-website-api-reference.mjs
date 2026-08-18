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
      ? '这里列出当前 Hypha 公共入口的全部导出，并按 npm 包与源码模块拆分。模块指南负责解释设计意图和组合方式；本区负责回答“具体有哪些类、函数、类型和常量，它们从哪里导出”。'
      : 'This section enumerates every export from the current Hypha public entrypoints, grouped by npm package and source module. Package guides explain design intent and composition; these pages answer which classes, functions, interfaces, types and constants exist and where they come from.',
    '',
    `> ${zh ? '生成方式' : 'Generated reference'}: \`npm run docs:api\`. ${zh ? '签名由构建后的 TypeScript 声明生成，超长推导类型会压缩显示并链接源码；修改公共导出后应重新生成并提交这些页面。' : 'Signatures are derived from built TypeScript declarations; very long inferred types are compacted and linked to source. Regenerate and commit these pages after changing public exports.'}`,
    '',
    `## ${zh ? '如何阅读' : 'How to use this reference'}`,
    '',
    zh
      ? '1. 先从[逐功能指南](/zh/guide/capability-map)确定功能边界和执行顺序。\n2. 打开对应[模块指南](/zh/packages/)查看完整示例和运行时不变量。\n3. 在下表进入包级 API，按源码模块定位具体 Symbol、签名与类成员。'
      : '1. Start with the [feature map](/guide/capability-map) to understand boundaries and execution order.\n2. Open the relevant [package guide](/packages/) for composition examples and runtime invariants.\n3. Use the package API pages below to locate exact symbols, signatures and class members by source module.',
    '',
    `## ${zh ? '包索引' : 'Package index'}`,
    '',
    `| ${zh ? '包' : 'Package'} | ${zh ? '职责' : 'Responsibility'} | ${zh ? '学习指南' : 'Guide'} |`,
    '| --- | --- | --- |',
    ...packages.map((name) => {
      const description = packageDescriptions[name][zh ? 1 : 0];
      return `| [\`@codesoul-co/hypha-${name}\`](${prefix}/api/${name}) | ${description} | [${zh ? '模块指南' : 'Package guide'}](${prefix}/packages/${name}) |`;
    }),
    '',
    `## ${zh ? '稳定性说明' : 'Stability notes'}`,
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
    `- ${zh ? '模块指南' : 'Package guide'}: [\`${packageLabel}\`](${prefix}/packages/${packageName})`,
    `- ${zh ? '安装' : 'Install'}: \`npm install ${packageLabel}@1.0.1\``,
    `- ${zh ? '公共导出' : 'Public exports'}: **${exports.length}**`,
    '',
    `## ${zh ? '导出概览' : 'Export overview'}`,
    '',
    `| ${zh ? '种类' : 'Kind'} | ${zh ? '数量' : 'Count'} |`,
    '| --- | ---: |',
    ...Object.entries(counts).map(([kind, count]) => `| ${kindLabel(kind, language)} | ${count} |`),
    '',
    `## ${zh ? '源码模块' : 'Source modules'}`,
    '',
    `| ${zh ? '模块' : 'Module'} | ${zh ? '导出数' : 'Exports'} | ${zh ? '源码' : 'Source'} |`,
    '| --- | ---: | --- |',
    ...[...modules.entries()].map(([moduleName, items]) => {
      return `| [\`${moduleName}\`](${prefix}/api/${packageName}/${modulePagePath(moduleName)}) | ${items.length} | [source](${sourceUrl(packageName, moduleName)}) |`;
    }),
    '',
    `## ${zh ? '阅读顺序' : 'Reading order'}`,
    '',
    zh
      ? '先在上表选择源码模块，再查看该模块导出的 Symbol、签名、说明以及类/接口的公开成员。每个模块页都链接回实际源码。'
      : 'Choose a source module above, then inspect its exported symbols, signatures, descriptions and public class/interface members. Every module page links back to the implementation source.',
    '',
    `## ${zh ? '使用约定' : 'Usage conventions'}`,
    '',
    zh
      ? '- 从包入口导入，不依赖未导出的内部文件。\n- 对配置、网络请求和持久化数据使用 Runtime Schema 解析。\n- 类实例负责运行时行为；Spec/Interface 负责跨模块契约；不要把 Provider SDK 类型泄漏到 Core。\n- 结合[可运行示例](/zh/guide/examples)验证实际调用顺序。'
      : '- Import from the package entrypoint instead of relying on unexported internal files.\n- Parse configuration, network requests and persisted data with runtime schemas.\n- Classes provide runtime behavior while specs/interfaces define cross-module contracts; do not leak provider SDK types into Core.\n- Use the [runnable examples](/guide/examples) to verify real call order.',
    '',
  ];
  return lines.join('\n');
}

function renderModulePage(packageName, moduleName, items, language) {
  const zh = language === 'zh';
  const prefix = zh ? '/zh' : '';
  const packageLabel = `@codesoul-co/hypha-${packageName}`;
  const lines = [
    `# \`${packageLabel}\` / \`${moduleName}\``,
    '',
    `- ${zh ? '包索引' : 'Package index'}: [\`${packageLabel}\`](${prefix}/api/${packageName})`,
    `- ${zh ? '模块指南' : 'Package guide'}: [${zh ? '学习与组合说明' : 'learning and composition guide'}](${prefix}/packages/${packageName})`,
    `- ${zh ? '源码' : 'Source'}: [\`packages/${packageName}/src/${sourcePath(moduleName)}\`](${sourceUrl(packageName, moduleName)})`,
    `- ${zh ? '导出数' : 'Exports'}: **${items.length}**`,
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

  const contracts = items.filter(
    (item) => (item.kind === 'class' || item.kind === 'interface') && item.members.length > 0
  );
  for (const item of contracts) {
    lines.push(
      `## \`${item.name}\` ${zh ? (item.kind === 'class' ? '公开成员' : '契约字段') : item.kind === 'class' ? 'public members' : 'contract members'}`,
      ''
    );
    if (item.description) lines.push(item.description, '');
    lines.push(
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
    kind,
    module: declarationModule(packageName, declaration),
    signature: symbolSignature(exported.getName(), target, declaration, kind),
    description: documentation(target),
    members:
      kind === 'class'
        ? classMembers(target)
        : kind === 'interface'
          ? interfaceMembers(target)
          : [],
  };
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
    .map((member) => ({
      ...describeMember(member, declaration),
      name: `static ${member.getName()}`,
    }));
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

function describeMember(member, location) {
  const declaration = member.valueDeclaration ?? member.declarations?.[0] ?? location;
  const type = checker.getTypeOfSymbolAtLocation(member, declaration);
  const calls = checker.getSignaturesOfType(type, ts.SignatureKind.Call);
  return {
    name: member.getName(),
    kind: calls.length > 0 ? 'method' : 'property',
    signature:
      calls.length > 0
        ? calls
            .map(
              (signature) =>
                `${member.getName()}${checker.signatureToString(signature, declaration, ts.TypeFormatFlags.NoTruncation)}`
            )
            .join(' | ')
        : `${member.getName()}: ${checker.typeToString(type, declaration, ts.TypeFormatFlags.NoTruncation)}`,
    description: documentation(member),
  };
}

function isPrivateOrProtected(symbol) {
  return (symbol.declarations ?? []).some((declaration) =>
    declaration.modifiers?.some(
      (modifier) =>
        modifier.kind === ts.SyntaxKind.PrivateKeyword ||
        modifier.kind === ts.SyntaxKind.ProtectedKeyword
    )
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
      other: '其他',
    }[kind] ?? kind
  );
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
      ? `${subject} 的运行时实现；公开构造函数与成员见下表。`
      : `Runtime implementation for ${subject}; see its public constructor and members below.`;
  }
  if (item.kind === 'interface') {
    return language === 'zh'
      ? `${subject} 的字段契约；完整字段见下表。`
      : `Field contract for ${subject}; see all contract members below.`;
  }
  if (item.kind === 'function') return inferOperation(item.name, subject, language);
  if (item.kind === 'type') {
    return language === 'zh' ? `${subject} 的公共类型别名。` : `Public type alias for ${subject}.`;
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
    const subject = humanize(member.name.replace(/^static /, ''));
    return language === 'zh' ? `${subject} 字段。` : `Public ${subject} property.`;
  }
  return inferOperation(member.name.replace(/^static /, ''), humanize(member.name), language);
}

function inferOperation(name, subject, language) {
  const operations = [
    ['create', '创建', 'Creates'],
    ['build', '构建', 'Builds'],
    ['compile', '编译', 'Compiles'],
    ['parse', '解析并校验', 'Parses and validates'],
    ['validate', '校验', 'Validates'],
    ['normalize', '规范化', 'Normalizes'],
    ['serialize', '序列化', 'Serializes'],
    ['deserialize', '反序列化', 'Deserializes'],
    ['analyze', '分析', 'Analyzes'],
    ['evaluate', '评估', 'Evaluates'],
    ['plan', '规划', 'Plans'],
    ['apply', '应用', 'Applies'],
    ['resolve', '解析', 'Resolves'],
    ['register', '注册', 'Registers'],
    ['load', '加载', 'Loads'],
    ['save', '保存', 'Saves'],
    ['append', '追加', 'Appends'],
    ['record', '记录', 'Records'],
    ['project', '投影', 'Projects'],
    ['assert', '断言', 'Asserts'],
    ['list', '列出', 'Lists'],
    ['get', '读取', 'Gets'],
    ['set', '写入', 'Sets'],
    ['delete', '删除', 'Deletes'],
    ['remove', '移除', 'Removes'],
    ['start', '启动', 'Starts'],
    ['cancel', '取消', 'Cancels'],
    ['transition', '迁移', 'Transitions'],
    ['decide', '决定', 'Decides'],
    ['can', '判断能否', 'Checks whether it can'],
    ['on', '处理', 'Handles'],
    ['is', '判断', 'Checks'],
    ['has', '判断是否存在', 'Checks whether'],
  ];
  const match = operations.find(([prefix]) => name.toLowerCase().startsWith(prefix));
  if (!match) {
    return language === 'zh'
      ? `${subject} 的公开运行时操作。`
      : `Public runtime operation for ${subject}.`;
  }
  const remainder = humanize(name.slice(match[0].length)) || subject;
  return language === 'zh'
    ? `${match[1]} ${remainder}。`
    : `${match[2]} ${remainder} at this module boundary.`;
}

function humanize(value) {
  return value
    .replace(/^static /, '')
    .replace(/SpecDefinition$/, ' spec')
    .replace(/JsonSchema$/, ' JSON schema')
    .replace(/Schema$/, ' schema')
    .replace(/Example$/, ' example')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .trim();
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
