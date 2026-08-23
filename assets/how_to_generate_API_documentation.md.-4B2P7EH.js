import{_ as l,b as e,e as p,a6 as i,f as n,q as a}from"./chunks/framework.CTTTCP0W.js";const C=JSON.parse('{"title":"API Documentation Generation and Migration Guide (how_to_generate_API_documentation.md)","description":"","frontmatter":{},"headers":[],"relativePath":"how_to_generate_API_documentation.md","filePath":"how_to_generate_API_documentation.md","lastUpdated":1787517273000}'),t={name:"how_to_generate_API_documentation.md"},o={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},r={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.181ex",role:"img",focusable:"false",viewBox:"0 -511 1000 522","aria-hidden":"true"},c={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},d={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.181ex",role:"img",focusable:"false",viewBox:"0 -511 1000 522","aria-hidden":"true"},h={class:"MathJax",jax:"SVG",style:{direction:"ltr",position:"relative"}},m={style:{overflow:"visible","min-height":"1px","min-width":"1px","vertical-align":"-0.025ex"},xmlns:"http://www.w3.org/2000/svg",width:"2.262ex",height:"1.181ex",role:"img",focusable:"false",viewBox:"0 -511 1000 522","aria-hidden":"true"};function k(u,s,g,G,R,T){return e(),p("div",null,[s[25]||(s[25]=i('<h1 id="api-documentation-generation-and-migration-guide-how-to-generate-api-documentation-md" tabindex="-1">API Documentation Generation and Migration Guide (<code>how_to_generate_API_documentation.md</code>) <a class="header-anchor" href="#api-documentation-generation-and-migration-guide-how-to-generate-api-documentation-md" aria-label="Permalink to &quot;API Documentation Generation and Migration Guide (`how_to_generate_API_documentation.md`)&quot;">​</a></h1><p>This document outlines the architecture, filename sanitization rules, custom layout template, and progress tracking checklist for AI agents and maintainers generating API reference documentation for Graphics32.</p><hr><h2 id="_1-overview-document-purpose" tabindex="-1">1. Overview &amp; Document Purpose <a class="header-anchor" href="#_1-overview-document-purpose" aria-label="Permalink to &quot;1. Overview &amp; Document Purpose&quot;">​</a></h2><p>This guide details how Pascal source units in <code>Source/</code> are parsed and converted into VitePress Markdown pages in <code>docs/api/</code>.</p><p>It defines:</p>',6)),n("ol",null,[n("li",null,[s[2]||(s[2]=n("strong",null,"Filename Sanitization Rules",-1)),s[3]||(s[3]=a(": Safe cross-platform mapping for generic types (e.g. ",-1)),s[4]||(s[4]=n("code",null,"TList<T>",-1)),s[5]||(s[5]=a()),n("mjx-container",o,[(e(),p("svg",r,[...s[0]||(s[0]=[n("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[n("g",{"data-mml-node":"math"},[n("g",{"data-mml-node":"mo"},[n("path",{"data-c":"2192",d:"M56 237T56 250T70 270H835Q719 357 692 493Q692 494 692 496T691 499Q691 511 708 511H711Q720 511 723 510T729 506T732 497T735 481T743 456Q765 389 816 336T935 261Q944 258 944 250Q944 244 939 241T915 231T877 212Q836 186 806 152T761 85T740 35T732 4Q730 -6 727 -8T711 -11Q691 -11 691 0Q691 7 696 25Q728 151 835 230H70Q56 237 56 250Z",style:{"stroke-width":"3"}})])])],-1)])])),s[1]||(s[1]=n("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("mo",{stretchy:"false"},"→")])],-1))]),s[6]||(s[6]=a()),s[7]||(s[7]=n("code",null,"TList(T).md",-1)),s[8]||(s[8]=a(").",-1))]),s[9]||(s[9]=n("li",null,[n("strong",null,[a("Custom Vue Layout Architecture ("),n("code",null,"layout: api"),a(")")]),a(": Separating structured machine data (YAML frontmatter) from human-editable Markdown body.")],-1)),s[10]||(s[10]=n("li",null,[n("strong",null,"Progress Checklist"),a(": A flat tracking list of all Pascal units in "),n("code",null,"Source/"),a(".")],-1))]),s[26]||(s[26]=i('<hr><h2 id="_2-generic-identifier-file-naming-rules" tabindex="-1">2. Generic Identifier &amp; File Naming Rules <a class="header-anchor" href="#_2-generic-identifier-file-naming-rules" aria-label="Permalink to &quot;2. Generic Identifier &amp; File Naming Rules&quot;">​</a></h2><h3 id="a-the-naming-problem" tabindex="-1">A. The Naming Problem <a class="header-anchor" href="#a-the-naming-problem" aria-label="Permalink to &quot;A. The Naming Problem&quot;">​</a></h3><p>Pascal generics and advanced types can contain angle brackets <code>&lt;</code> and <code>&gt;</code>. For example: <code>TList&lt;T&gt;</code>, <code>TDictionary&lt;TKey, TValue&gt;</code>.</p><ul><li>Angle brackets (<code>&lt; &gt;</code>) are <strong>illegal file system characters</strong> on Windows, macOS, and Linux.</li><li>Replacing <code>&lt; &gt;</code> with underscores (<code>_</code>) creates <strong>silent name collision risks</strong> because <code>_</code> is a valid identifier character in Pascal (e.g., <code>TList_1</code> vs <code>TList&lt;1&gt;</code>).</li><li>Replacing <code>&lt; &gt;</code> with square brackets (<code>[ ]</code>) conflicts with <strong>VitePress / Vue Router dynamic route parameters</strong> (where <code>[id].md</code> is treated as a dynamic parameter route).</li></ul><h3 id="b-the-tlist-t-parentheses-solution" tabindex="-1">B. The <code>TList(T)</code> Parentheses Solution <a class="header-anchor" href="#b-the-tlist-t-parentheses-solution" aria-label="Permalink to &quot;B. The `TList(T)` Parentheses Solution&quot;">​</a></h3><p>To ensure 100% collision-free filenames that work across all operating systems without Vue Router conflicts:</p>',7)),n("ol",null,[n("li",null,[s[23]||(s[23]=n("p",null,[n("strong",null,"Filename Mapping"),a(": Replace "),n("code",null,"<"),a(" with "),n("code",null,"("),a(" and "),n("code",null,">"),a(" with "),n("code",null,")"),a(" in Markdown filenames:")],-1)),n("ul",null,[n("li",null,[s[13]||(s[13]=n("code",null,"TList<T>",-1)),s[14]||(s[14]=a()),n("mjx-container",c,[(e(),p("svg",d,[...s[11]||(s[11]=[n("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[n("g",{"data-mml-node":"math"},[n("g",{"data-mml-node":"mo"},[n("path",{"data-c":"2192",d:"M56 237T56 250T70 270H835Q719 357 692 493Q692 494 692 496T691 499Q691 511 708 511H711Q720 511 723 510T729 506T732 497T735 481T743 456Q765 389 816 336T935 261Q944 258 944 250Q944 244 939 241T915 231T877 212Q836 186 806 152T761 85T740 35T732 4Q730 -6 727 -8T711 -11Q691 -11 691 0Q691 7 696 25Q728 151 835 230H70Q56 237 56 250Z",style:{"stroke-width":"3"}})])])],-1)])])),s[12]||(s[12]=n("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("mo",{stretchy:"false"},"→")])],-1))]),s[15]||(s[15]=a()),s[16]||(s[16]=n("code",null,"docs/api/GR32_Containers/TList(T).md",-1))]),n("li",null,[s[19]||(s[19]=n("code",null,"TDictionary<TKey, TValue>",-1)),s[20]||(s[20]=a()),n("mjx-container",h,[(e(),p("svg",m,[...s[17]||(s[17]=[n("g",{stroke:"currentColor",fill:"currentColor","stroke-width":"0",transform:"scale(1,-1)"},[n("g",{"data-mml-node":"math"},[n("g",{"data-mml-node":"mo"},[n("path",{"data-c":"2192",d:"M56 237T56 250T70 270H835Q719 357 692 493Q692 494 692 496T691 499Q691 511 708 511H711Q720 511 723 510T729 506T732 497T735 481T743 456Q765 389 816 336T935 261Q944 258 944 250Q944 244 939 241T915 231T877 212Q836 186 806 152T761 85T740 35T732 4Q730 -6 727 -8T711 -11Q691 -11 691 0Q691 7 696 25Q728 151 835 230H70Q56 237 56 250Z",style:{"stroke-width":"3"}})])])],-1)])])),s[18]||(s[18]=n("mjx-assistive-mml",{unselectable:"on",display:"inline",style:{top:"0px",left:"0px",clip:"rect(1px, 1px, 1px, 1px)","-webkit-touch-callout":"none","-webkit-user-select":"none","-khtml-user-select":"none","-moz-user-select":"none","-ms-user-select":"none","user-select":"none",position:"absolute",padding:"1px 0px 0px 0px",border:"0px",display:"block",width:"auto",overflow:"hidden"}},[n("math",{xmlns:"http://www.w3.org/1998/Math/MathML"},[n("mo",{stretchy:"false"},"→")])],-1))]),s[21]||(s[21]=a()),s[22]||(s[22]=n("code",null,"docs/api/GR32_Containers/TDictionary(TKey,TValue).md",-1))])])]),s[24]||(s[24]=i(`<li><p><strong>Display Name in Frontmatter</strong>: Set the exact Pascal declaration name in YAML frontmatter:</p><div class="language-yaml vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">yaml</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">layout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">api</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">unit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GR32_Containers</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TList&lt;T&gt;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Class</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">---</span></span></code></pre></div><p>VitePress will display the exact formatted identifier <code>TList&lt;T&gt;</code> in page headers, search results, and sidebars, while the filesystem safely stores <code>TList(T).md</code>.</p></li>`,1))]),s[27]||(s[27]=i(`<hr><h2 id="_3-custom-vue-layout-architecture-layout-api" tabindex="-1">3. Custom Vue Layout Architecture (<code>layout: api</code>) <a class="header-anchor" href="#_3-custom-vue-layout-architecture-layout-api" aria-label="Permalink to &quot;3. Custom Vue Layout Architecture (\`layout: api\`)&quot;">​</a></h2><p>To ensure standard typography, fixed section order, and interactive badges across all API pages while allowing maintainers to write custom explanations:</p><h3 id="a-structure" tabindex="-1">A. Structure <a class="header-anchor" href="#a-structure" aria-label="Permalink to &quot;A. Structure&quot;">​</a></h3><ul><li><strong>YAML Frontmatter</strong>: Machine-readable metadata (<code>unit</code>, <code>entity</code>, <code>kind</code>, <code>declaration</code>, <code>inheritance</code>, <code>parameters</code>, <code>returns</code>).</li><li><strong>Markdown Body</strong>: Human-editable content (usage explanations, remarks, edge cases, code examples).</li></ul><h3 id="b-example-api-markdown-page" tabindex="-1">B. Example API Markdown Page <a class="header-anchor" href="#b-example-api-markdown-page" aria-label="Permalink to &quot;B. Example API Markdown Page&quot;">​</a></h3><div class="language-markdown vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">markdown</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">layout</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">api</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">unit</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">GR32</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">entity</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TBitmap32</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">kind</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">Class</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">inheritance</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TObject</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TPersistent</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TNotifiablePersistent</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  - </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">TCustomBitmap32</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">declaration</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;TBitmap32 = class(TCustomBitmap32)&quot;</span></span>
<span class="line"><span style="--shiki-light:#22863A;--shiki-dark:#85E89D;">summary</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;Primary 32-bit ARGB bitmap container class in Graphics32.&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">---</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Remarks</span></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-dark:#79B8FF;">\`TBitmap32\`</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> provides fast direct 2D array access to 32-bit ARGB pixel memory buffers.</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#005CC5;--shiki-light-font-weight:bold;--shiki-dark:#79B8FF;--shiki-dark-font-weight:bold;">## Examples</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">\`\`\`pascal</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">var</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Bmp: TBitmap32;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">begin</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  Bmp := TBitmap32.Create(800, 600);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  try</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Bmp.Clear(clWhite32);</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  finally</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">    Bmp.Free;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">  end;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">end;</span></span></code></pre></div><div class="language- vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 4. How an AI Agent Populates Unit Members</span></span>
<span class="line"><span></span></span>
<span class="line"><span>To manage token limits effectively, member lists are populated **in small batches** when an agent begins work on a unit:</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1. **Inspect Unit Source**: Read the \`interface\` section of \`Source/&lt;UnitName&gt;.pas\`.</span></span>
<span class="line"><span>2. **Expand the Unit Item**: Under \`- [ ] &lt;UnitName&gt;\`, insert nested checklist sections for Classes, Functions, Records, Interfaces, Constants, and Other Types.</span></span>
<span class="line"><span>3. **Check Off Completed Items**: Check off items (\`- [x]\`) as Markdown files are created.</span></span>
<span class="line"><span>4. **Mark Unit Complete**: Mark \`- [x] &lt;UnitName&gt;\` when all members are fully documented.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>---</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## 5. Unit Progress Checklist</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- [ ] **Clipper**</span></span>
<span class="line"><span>- [ ] **Clipper.Core**</span></span>
<span class="line"><span>- [ ] **Clipper.Engine**</span></span>
<span class="line"><span>- [ ] **Clipper.Minkowski**</span></span>
<span class="line"><span>- [ ] **Clipper.Offset**</span></span>
<span class="line"><span>- [ ] **Clipper.RectClip**</span></span>
<span class="line"><span>- [ ] **GR32**</span></span>
<span class="line"><span>  - **Classes**:</span></span>
<span class="line"><span>    - [x] \`TBitmap32\` -&gt; \`docs/api/GR32/TBitmap32/index.md\`</span></span>
<span class="line"><span>      - [x] Constructors/\`Create\` -&gt; \`docs/api/GR32/TBitmap32/Constructors/Create.md\`</span></span>
<span class="line"><span>      - [x] Constructors/\`Destroy\` -&gt; \`docs/api/GR32/TBitmap32/Constructors/Destroy.md\`</span></span>
<span class="line"><span>      - [x] Methods/\`Clear\` -&gt; \`docs/api/GR32/TBitmap32/Methods/Clear.md\`</span></span>
<span class="line"><span>      - [x] Methods/\`Draw\` -&gt; \`docs/api/GR32/TBitmap32/Methods/Draw.md\`</span></span>
<span class="line"><span>      - [x] Properties/\`Pixel\` -&gt; \`docs/api/GR32/TBitmap32/Properties/Pixel.md\`</span></span>
<span class="line"><span>    - [x] \`TCustomBitmap32\` -&gt; \`docs/api/GR32/TCustomBitmap32/index.md\`</span></span>
<span class="line"><span>    - [x] \`TNotifiablePersistent\` -&gt; \`docs/api/GR32/TNotifiablePersistent/index.md\`</span></span>
<span class="line"><span>    - [x] \`TCustomSampler\` -&gt; \`docs/api/GR32/TCustomSampler/index.md\`</span></span>
<span class="line"><span>    - [x] \`TCustomResampler\` -&gt; \`docs/api/GR32/TCustomResampler/index.md\`</span></span>
<span class="line"><span>    - [ ] \`TCustomBackend\`</span></span>
<span class="line"><span>    - [ ] \`TCustomBackendClass\`</span></span>
<span class="line"><span>    - [ ] \`TCustomBitmap32Class\`</span></span>
<span class="line"><span>    - [ ] \`TCustomResamplerClass\`</span></span>
<span class="line"><span>    - [ ] \`TPlainInterfacedPersistent\`</span></span>
<span class="line"><span>    - [ ] \`TThreadPersistent\`</span></span>
<span class="line"><span>  - **Functions**:</span></span>
<span class="line"><span>    - [x] \`Color32\`</span></span>
<span class="line"><span>    - [x] \`AlphaComponent\`</span></span>
<span class="line"><span>    - [x] \`RedComponent\`</span></span>
<span class="line"><span>    - [x] \`GreenComponent\`</span></span>
<span class="line"><span>    - [x] \`BlueComponent\`</span></span>
<span class="line"><span>    - [ ] \`SetAlpha\`</span></span>
<span class="line"><span>    - [ ] \`Intensity\`</span></span>
<span class="line"><span>    - [ ] \`RGBtoHSV\` / \`HSVtoRGB\`</span></span>
<span class="line"><span>  - **Records**:</span></span>
<span class="line"><span>    - [ ] \`TColor32Entry\`</span></span>
<span class="line"><span>    - [ ] \`TFixedPoint\`</span></span>
<span class="line"><span>    - [ ] \`TFixedRec\`</span></span>
<span class="line"><span>    - [ ] \`TFixedRect\`</span></span>
<span class="line"><span>    - [ ] \`TFloatPoint\`</span></span>
<span class="line"><span>    - [ ] \`TFloatRect\`</span></span>
<span class="line"><span>  - **Interfaces**:</span></span>
<span class="line"><span>    - *(None)*</span></span>
<span class="line"><span>  - **Constants**:</span></span>
<span class="line"><span>    - [x] \`clBlack32\`, \`clWhite32\`, \`clRed32\`, \`clGreen32\`, \`clBlue32\`, \`clTrColor32\`</span></span>
<span class="line"><span>  - **Other Types**:</span></span>
<span class="line"><span>    - [x] \`TColor32\`</span></span>
<span class="line"><span>    - [ ] \`TArrayOfColor32\`</span></span>
<span class="line"><span>    - [ ] \`PColor32\`</span></span>
<span class="line"><span>    - [ ] \`TFixed\`</span></span>
<span class="line"><span>- [ ] **GR32.BigEndian**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Assembler**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Modes**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Modes.Extra**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Modes.PhotoShop**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Modes.PorterDuff**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.Pascal**</span></span>
<span class="line"><span>- [ ] **GR32.Blend.SSE2**</span></span>
<span class="line"><span>- [ ] **GR32.Blur**</span></span>
<span class="line"><span>- [ ] **GR32.Blur.RecursiveGaussian**</span></span>
<span class="line"><span>- [ ] **GR32.Blur.SelectiveGaussian**</span></span>
<span class="line"><span>- [ ] **GR32.CPUID**</span></span>
<span class="line"><span>- [ ] **GR32.Examples**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.BMP**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.Default**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.GIF**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.JPG**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PNG**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PNG32**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PSD**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PSD.Model**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PSD.Reader**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PSD.Types**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.PSD.Writer**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.SVG**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TBitmap**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TClipboard**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TGraphic**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TIcon**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TMetaFile**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TPicture**</span></span>
<span class="line"><span>- [ ] **GR32.ImageFormats.TWICImage**</span></span>
<span class="line"><span>- [ ] **GR32.Math.Complex**</span></span>
<span class="line"><span>- [ ] **GR32.Noise.Simplex**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Brush**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Controller**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Controller.API**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Host**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Host.API**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.MouseController**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.MouseController.API**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Tool**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Tool.API**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Tool.Brush**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.Tool.Pen**</span></span>
<span class="line"><span>- [ ] **GR32.Paint.ToolContext**</span></span>
<span class="line"><span>- [ ] **GR32.Text.Cache**</span></span>
<span class="line"><span>- [ ] **GR32.Text.FontFace**</span></span>
<span class="line"><span>- [ ] **GR32.Text.Layout**</span></span>
<span class="line"><span>- [ ] **GR32.Text.Types**</span></span>
<span class="line"><span>- [ ] **GR32.Text.Unicode**</span></span>
<span class="line"><span>- [ ] **GR32.Text.Win**</span></span>
<span class="line"><span>- [ ] **GR32.Transpose**</span></span>
<span class="line"><span>- [ ] **GR32.Types.SIMD**</span></span>
<span class="line"><span>- [ ] **GR32_ArrowHeads**</span></span>
<span class="line"><span>- [ ] **GR32_Backends**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_Generic**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_LCL_Carbon**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_LCL_CustomDrawn**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_LCL_Gtk**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_LCL_Win**</span></span>
<span class="line"><span>- [ ] **GR32_Backends_VCL**</span></span>
<span class="line"><span>- [ ] **GR32_Bindings**</span></span>
<span class="line"><span>- [ ] **GR32_Blend**</span></span>
<span class="line"><span>- [ ] **GR32_Blurs**</span></span>
<span class="line"><span>- [ ] **GR32_Brushes**</span></span>
<span class="line"><span>- [ ] **GR32_Clipboard**</span></span>
<span class="line"><span>- [ ] **GR32_Clipper**</span></span>
<span class="line"><span>- [ ] **GR32_Clipper1**</span></span>
<span class="line"><span>- [ ] **GR32_Clipper2**</span></span>
<span class="line"><span>- [ ] **GR32_ColorGradients**</span></span>
<span class="line"><span>- [ ] **GR32_ColorPicker**</span></span>
<span class="line"><span>- [ ] **GR32_ColorSwatch**</span></span>
<span class="line"><span>- [ ] **GR32_Containers**</span></span>
<span class="line"><span>- [ ] **GR32_ExtImage**</span></span>
<span class="line"><span>- [ ] **GR32_Filters**</span></span>
<span class="line"><span>- [ ] **GR32_Gamma**</span></span>
<span class="line"><span>- [ ] **GR32_Geometry**</span></span>
<span class="line"><span>- [ ] **GR32_Image**</span></span>
<span class="line"><span>- [ ] **GR32_Layers**</span></span>
<span class="line"><span>- [ ] **GR32_LowLevel**</span></span>
<span class="line"><span>- [ ] **GR32_Math**</span></span>
<span class="line"><span>- [ ] **GR32_Math_FPC**</span></span>
<span class="line"><span>- [ ] **GR32_MicroTiles**</span></span>
<span class="line"><span>- [ ] **GR32_OrdinalMaps**</span></span>
<span class="line"><span>- [ ] **GR32_Paths**</span></span>
<span class="line"><span>- [ ] **GR32_Png**</span></span>
<span class="line"><span>- [ ] **GR32_Polygons**</span></span>
<span class="line"><span>- [ ] **GR32_Polygons.AggLite**</span></span>
<span class="line"><span>- [ ] **GR32_Polygons.Direct2D**</span></span>
<span class="line"><span>- [ ] **GR32_Polygons.GDI**</span></span>
<span class="line"><span>- [ ] **GR32_Polygons.GDIPlus**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.IDAT**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.PLTE**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.Unknown**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.bKGD**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.cHRM**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.gAMA**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.hIST**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.iCCP**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.iTXt**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.oFFs**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.pCAL**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.pHYs**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.sBIT**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.sCAL**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.sPLT**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.sRGB**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.tEXt**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.tIME**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.tRNS**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Chunks.zTXt**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Encoding**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Transcoding**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.Types**</span></span>
<span class="line"><span>- [ ] **GR32_PortableNetworkGraphic.ZLib**</span></span>
<span class="line"><span>- [ ] **GR32_RangeBars**</span></span>
<span class="line"><span>- [ ] **GR32_Rasterizers**</span></span>
<span class="line"><span>- [ ] **GR32_RepaintOpt**</span></span>
<span class="line"><span>- [ ] **GR32_Resamplers**</span></span>
<span class="line"><span>- [ ] **GR32_System**</span></span>
<span class="line"><span>- [ ] **GR32_Text_VCL_D2D**</span></span>
<span class="line"><span>- [ ] **GR32_Transforms**</span></span>
<span class="line"><span>- [ ] **GR32_VPR**</span></span>
<span class="line"><span>- [ ] **GR32_VPR2**</span></span>
<span class="line"><span>- [ ] **GR32_VectorMaps**</span></span>
<span class="line"><span>- [ ] **GR32_VectorUtils**</span></span>
<span class="line"><span>- [ ] **GR32_VectorUtils.Angus**</span></span>
<span class="line"><span>- [ ] **GR32_VectorUtils.Clipper2**</span></span>
<span class="line"><span>- [ ] **GR32_VectorUtils.Reference**</span></span>
<span class="line"><span>- [ ] **amEasing**</span></span></code></pre></div>`,8))])}const y=l(t,[["render",k]]);export{C as __pageData,y as default};
