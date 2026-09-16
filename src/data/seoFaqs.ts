export interface SeoFaqItem {
  id: string;
  question: string;
  category: 'svg' | 'favicon' | 'converter';
  language: 'pt' | 'de' | 'en' | 'es' | 'fr';
  answer: string; // Clean text for Schema.org JSON-LD
  photoshopSteps?: string[];
  illustratorSteps?: string[];
  mathFormula?: {
    name: string;
    formula: string;
    explanation: string;
  };
  codeSnippet?: {
    language: string;
    code: string;
  };
}

export const SEO_FAQS: SeoFaqItem[] = [
  // --- Portuguese SVG Questions ---
  {
    id: 'svg-o-que-e',
    question: 'svg o que é',
    category: 'svg',
    language: 'pt',
    answer: 'SVG significa Scalable Vector Graphics (Gráficos Vetoriais Escaláveis). É um formato baseado em XML padronizado pelo W3C que descreve linhas, curvas e formas bidimensionais através de coordenadas matemáticas, garantindo nitidez infinita em qualquer resolução sem pixelização.',
    mathFormula: {
      name: 'Equação Paramétrica de Curva de Bézier Cúbica',
      formula: 'B(t) = (1-t)³P₀ + 3(1-t)²tP₁ + 3(1-t)t²P₂ + t³P₃,  t ∈ [0, 1]',
      explanation: 'O SVG define contornos perfeitos através de polinômios de Bernstein em vez de uma grade estática de pixels.'
    },
    illustratorSteps: [
      'Abra seu design ou vetorize uma imagem com Janela > Rastreio da Imagem.',
      'Acesse Arquivo > Salvar Como e selecione SVG (*.SVG).',
      'No painel Opções de SVG, escolha Perfil SVG 1.1 e CSS: Atributos de Apresentação.'
    ],
    photoshopSteps: [
      'Crie ou rasterize formas vetoriais com a Ferramenta Caneta (P) ou Formas.',
      'No painel Camadas, clique com o botão direito na camada de forma vetorial.',
      'Selecione "Exportar como..." e escolha formato SVG.'
    ]
  },
  {
    id: 'o-que-e-svg',
    question: 'o que é svg',
    category: 'svg',
    language: 'pt',
    answer: 'O SVG (Scalable Vector Graphics) é um padrão aberto de imagem vetorial que utiliza texto XML estruturado. Ao contrário de PNGs ou JPEGs que armazenam pixels, o SVG armazena nós, caminhos e atributos de preenchimento, consumindo menos bytes e permitindo estilização direta com CSS e animação via JavaScript.',
    mathFormula: {
      name: 'Fator de Escala sem Perda de Resolução',
      formula: 'Resolucao(k) = k · [X, Y]ᵀ  onde  Qualidade(k) = 1.0  ∀ k > 0',
      explanation: 'Ao multiplicar as dimensões por qualquer fator k, a nitidez permanece absoluta sem perda de fidelidade.'
    },
    illustratorSteps: [
      'Desenhe seus vetores na prancheta com dimensões exatas (ex: 512x512px).',
      'Converta textos em contornos pressionando Ctrl+Shift+O (Cmd+Shift+O).',
      'Vá em Arquivo > Exportar > Exportar para Telas e selecione o formato SVG.'
    ],
    photoshopSteps: [
      'Selecione o elemento gráfico com a Ferramenta Demarcador (A).',
      'Acesse Arquivo > Exportar > Demarcadores para o Illustrator.',
      'Abra o arquivo exportado e salve como SVG nativo com atributos inline.'
    ]
  },
  {
    id: 'arquivo-svg-o-que-e',
    question: 'arquivo svg o que é',
    category: 'svg',
    language: 'pt',
    answer: 'Um arquivo SVG (.svg) é um documento de texto em formato XML contendo instruções gráficas: tags como <svg>, <path>, <circle>, <rect> e <polygon>. Por ser texto puro legível por máquina, pode ser compactado com Gzip/Brotli para downloads ultrarrápidos na web.',
    codeSnippet: {
      language: 'xml',
      code: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">\n  <circle cx="50" cy="50" r="45" fill="#6366f1" />\n  <path d="M30 50 L45 65 L70 35" stroke="#ffffff" stroke-width="8" fill="none" />\n</svg>'
    },
    illustratorSteps: [
      'Organize suas camadas vetoriais de forma limpa.',
      'Selecione Objeto > Caminho > Simplificar para reduzir nós desnecessários.',
      'Exporte como SVG com codificação UTF-8 marcada.'
    ],
    photoshopSteps: [
      'Para ícones monocromáticos, use o recurso "Copiar SVG" clicando com o botão direito na camada vetorial.',
      'Cole o código XML resultante diretamente em seu editor de código ou ferramenta web.'
    ]
  },
  {
    id: 'o-que-e-um-arquivo-svg',
    question: 'o que é um arquivo svg',
    category: 'svg',
    language: 'pt',
    answer: 'Um arquivo SVG é uma representação vetorial matemática de uma imagem digital. Ideal para logotipos, ícones de interface, diagramas técnicos e projetos para máquinas de corte (Cricut, Silhouette e lasers), pois garante cortes precisos sem dentes de pixel em qualquer escala física.',
    mathFormula: {
      name: 'Simplificação de Caminho Douglas-Peucker',
      formula: 'd_perp = |(y₂ - y₁)x₀ - (x₂ - x₁)y₀ + x₂y₁ - y₂x₁| / √((y₂ - y₁)² + (x₂ - x₁)²)',
      explanation: 'Calcula a distância ortogonal máxima tolerada (ε) para descartar vértices redundantes mantendo a silhueta original.'
    },
    illustratorSteps: [
      'Abra a imagem rasterizada no Illustrator.',
      'Aplique "Vetorização de Imagem" escolhendo o preset "Logotipo Preto e Branco".',
      'Pressione "Expandir" na barra superior para gerar os demarcadores e salve como .SVG.'
    ],
    photoshopSteps: [
      'Carregue a seleção do desenho usando a Varinha Mágica (W).',
      'No painel Demarcadores, clique no botão "Fazer Demarcador de Trabalho da Seleção".',
      'Acesse Arquivo > Exportar > Exportar Como > SVG.'
    ]
  },

  // --- German SVG Questions ---
  {
    id: 'was-ist-eine-svg-datei',
    question: 'was ist eine svg datei',
    category: 'svg',
    language: 'de',
    answer: 'Eine SVG-Datei (Scalable Vector Graphics) ist eine XML-basierte Vektorgrafikdatei, die zweidimensionale Formen anhand von geometrischen Koordinaten, Pfaden und Farben beschreibt. Sie lässt sich verlustfrei auf jede Bildschirm- oder Druckgröße skalieren, ohne unscharf zu werden.',
    mathFormula: {
      name: 'Koordinaten-Affine-Transformation',
      formula: '⟦ x\' ⟧ = ⟦ a  c  e ⟧ ⟦ x ⟧\n⟦ y\' ⟧ = ⟦ b  d  f ⟧ ⟦ y ⟧\n⟦ 1  ⟧   ⟦ 0  0  1 ⟧ ⟦ 1 ⟧',
      explanation: 'SVG nutzt homogene Transformationsmatrizen (matrix(a,b,c,d,e,f)) für Skalierung, Rotation und Verschiebung.'
    },
    illustratorSteps: [
      'Öffnen Sie Ihr Logo in Adobe Illustrator.',
      'Wählen Sie Datei > Kopie speichern und stellen Sie das Format auf SVG (.svg).',
      'Aktivieren Sie im SVG-Optionendialog "Minimieren" und "Schriftarten in Konturen umwandeln".'
    ],
    photoshopSteps: [
      'Wandeln Sie Ihre Auswahlebene in einen Arbeitspfad um (Rechtsklick > Arbeitspfad erstellen).',
      'Wählen Sie die Vektorebene im Ebenenbedienfeld aus.',
      'Rechtsklick > "Exportieren als..." > Format: SVG auswählen und exportieren.'
    ]
  },
  {
    id: 'was-ist-svg',
    question: 'was ist svg',
    category: 'svg',
    language: 'de',
    answer: 'SVG steht für Scalable Vector Graphics und ist der weltweite Web-Standard für Vektorgrafiken des World Wide Web Consortiums (W3C). Im Gegensatz zu Pixelformaten (JPEG, PNG) besteht SVG aus strukturiertem XML-Code, der durch moderne Webbrowser direkt im DOM dargestellt und via CSS manipuliert werden kann.',
    codeSnippet: {
      language: 'xml',
      code: '<svg viewBox="0 0 64 64" fill="currentColor">\n  <path d="M32 2L2 62h60L32 2zm0 16l19 36H13l19-36z"/>\n</svg>'
    },
    illustratorSteps: [
      'Erstellen Sie das Motiv im RGB-Farbmodus für das Web.',
      'Wählen Sie Objekt > Pfad > Pfad vereinfachen zur Reduzierung der Ankerpunkte.',
      'Speichern Sie mit Datei > Exportieren > Für Bildschirme exportieren als SVG.'
    ],
    photoshopSteps: [
      'In Photoshop können Ebenen als SVG kopiert werden: Rechtsklick auf die Formebene > "SVG kopieren".',
      'Den kopierten Code direkt in HTML einbinden oder im SvgFav-Editor weiterverarbeiten.'
    ]
  },
  {
    id: 'ist-svg-eine-vektordatei',
    question: 'ist svg eine vektordatei',
    category: 'svg',
    language: 'de',
    answer: 'Ja, SVG ist das modernste und weitverbreitetste native Vektordateiformat im Web. Es speichert Bildinformationen nicht als Pixelraster, sondern als mathematische Pfade (Paths), Bezier-Kurven, Linien und Füllungen. Dadurch bleibt die Darstellung unabhängig von der Pixeldichte (High-DPI / 4K / Retina) immer gestochen scharf.',
    mathFormula: {
      name: 'Vektordichte & DPI-Unabhängigkeit',
      formula: 'DPI_effektiv = ∞,  da  f(x, y) = P(t) kontinuierlich berechnet wird',
      explanation: 'Da Vektoren analytische Funktionen sind, existiert kein inhärentes Auflösungslimit wie bei Bitmap-Rastergrafiken.'
    },
    illustratorSteps: [
      'Überprüfen Sie in der Pfadansicht (Strg+Y / Cmd+Y), ob alle Elemente echte Vektorkonturen sind.',
      'Wandeln Sie Konturen in geschlossene Flächen um: Objekt > Pfad > Konturlinie.',
      'Exportieren als sauberes SVG 1.1.'
    ],
    photoshopSteps: [
      'Achten Sie darauf, dass keine reinen Pixelbilder eingebettet sind.',
      'Nutzen Sie Pfad-Werkzeuge (P) für saubere Vektorebenen vor dem SVG-Export.'
    ]
  },

  // --- English SVG Questions ---
  {
    id: 'what-is-an-svg-file',
    question: 'what is an svg file',
    category: 'svg',
    language: 'en',
    answer: 'An SVG (.svg) file is an XML-based vector graphics file format defined by the World Wide Web Consortium (W3C). It defines two-dimensional graphics with support for interactivity, CSS styling, and animation. Because it uses vectors rather than pixels, SVG files can scale infinitely without quality loss.',
    mathFormula: {
      name: 'Parametric Arc Computation in SVG',
      formula: 'x(θ) = cx + rx · cos(θ) · cos(φ) - ry · sin(θ) · sin(φ)\ny(θ) = cy + rx · cos(θ) · sin(φ) + ry · sin(θ) · cos(φ)',
      explanation: 'SVG renders elliptical arcs (<path d="M... A rx ry φ ...">) using precise trigonometric parametric formulation.'
    },
    illustratorSteps: [
      'Open your graphic in Adobe Illustrator.',
      'Go to File > Save As and pick "SVG (*.SVG)".',
      'Set Styling to "Presentation Attributes" and uncheck "Preserve Illustrator Editing Capabilities" for clean web output.'
    ],
    photoshopSteps: [
      'Design using Vector Shape layers or the Pen Tool.',
      'Right-click the shape layer in the Layers panel and choose "Export As...".',
      'Select SVG format and click Export.'
    ]
  },
  {
    id: 'what-is-svg',
    question: 'what is svg',
    category: 'svg',
    language: 'en',
    answer: 'SVG stands for Scalable Vector Graphics. It is an open standard web format that describes visual assets using mathematical coordinates, lines, and curves instead of a fixed bitmap grid of pixels. It is supported by 100% of modern web browsers and graphics suites.',
    codeSnippet: {
      language: 'html',
      code: '<!-- Embedded inline SVG directly in HTML -->\n<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">\n  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke-width="2"/>\n</svg>'
    },
    illustratorSteps: [
      'Design on a clean square artboard (e.g. 24x24 for icons, 512x512 for logos).',
      'Select Window > SVG Interactivity or File > Export > Export As > SVG.',
      'Enable "Minify" and "Responsive" to omit hardcoded width/height attributes.'
    ],
    photoshopSteps: [
      'Select vector layer, right-click and click "Copy SVG".',
      'Paste the raw markup directly into your code editor or HTML5 template.'
    ]
  },
  {
    id: 'what-is-svg-file',
    question: 'what is svg file',
    category: 'svg',
    language: 'en',
    answer: 'An SVG file is a plain-text document structured with XML markup that specifies graphical shapes like paths, rectangles, circles, text, and gradients. Because it is textual, search engines like Google can crawl its text content, and developers can programmatically manipulate its colors, dimensions, and events.',
    mathFormula: {
      name: 'Gzip Text Compression Ratio on SVG',
      formula: 'CompressionRatio = 1 - (Size_{compressed} / Size_{raw}) ≈ 65\\% \\text{ to } 85\\%',
      explanation: 'XML repeated tokens and coordinate clusters compress exceptionally well over HTTP/3 connections.'
    },
    illustratorSteps: [
      'Clean up unused swatches and hidden layers.',
      'Choose File > Export > Export for Screens.',
      'Choose SVG format and click "Export Artboard".'
    ],
    photoshopSteps: [
      'Convert raster selections into paths via Paths panel > Make Work Path.',
      'Choose File > Export > Paths to Illustrator, then save as SVG.'
    ]
  },

  // --- Favicon Questions (EN, PT, DE) ---
  {
    id: 'what-is-a-favicon',
    question: 'what is a favicon',
    category: 'favicon',
    language: 'en',
    answer: 'A favicon (short for "favorite icon") is a small branded graphic displayed next to a website\'s title in browser tabs, bookmark bars, history lists, search engine result pages (SERPs), and mobile home screens. Modern websites use a combination of a multi-resolution favicon.ico, a dark/light responsive favicon.svg, and an apple-touch-icon.png.',
    mathFormula: {
      name: 'Multi-Resolution ICO Frame Dimensions',
      formula: 'Dim_{frames} = \\{16 \\times 16, 32 \\times 32, 48 \\times 48\\} \\text{ at } 32\\text{bpp (RGBA)}',
      explanation: 'Windows and browsers automatically select the optimal mipmap frame for tab bars, bookmark shelves, and taskbar shortcuts.'
    },
    illustratorSteps: [
      'Create a 512x512px square artboard with your high-contrast brand mark.',
      'Ensure paths fill the canvas with comfortable 10% safety margins.',
      'Export as a clean SVG or 512px PNG and drop it into SvgFav to generate the full multi-format bundle.'
    ],
    photoshopSteps: [
      'Create a new document at 512x512 pixels with 72 DPI and transparent background.',
      'Design a bold silhouette icon that remains legible when resized down to 16x16 pixels.',
      'Export as PNG-24, or use a dedicated ICO plugin to export a multi-frame .ico file.'
    ]
  },
  {
    id: 'how-to-add-favicon-in-html',
    question: 'how to add favicon in html',
    category: 'favicon',
    language: 'en',
    answer: 'To add a modern, production-grade favicon to an HTML document, place your generated favicon assets in the root public folder and insert the standardized <link> tags inside the <head> section. This ensures compatibility with legacy browsers, modern retina displays, dark mode themes, and mobile iOS/Android devices.',
    codeSnippet: {
      language: 'html',
      code: '<head>\n  <!-- 1. Classic Windows & Legacy Fallback -->\n  <link rel="icon" href="/favicon.ico" sizes="any">\n  <!-- 2. Modern Scalable SVG with Dark/Light mode -->\n  <link rel="icon" href="/favicon.svg" type="image/svg+xml">\n  <!-- 3. Apple iOS Home Screen Shortcut -->\n  <link rel="apple-touch-icon" href="/apple-touch-icon.png">\n  <!-- 4. Web App Manifest for Android PWAs -->\n  <link rel="manifest" href="/site.webmanifest">\n</head>'
    },
    illustratorSteps: [
      'Export your logo as favicon.svg.',
      'In SvgFav.com, generate the automated favicon pack ZIP containing all PNG sizes and site.webmanifest.',
      'Unzip into your website root /public directory and paste the snippet above into <head>.'
    ],
    photoshopSteps: [
      'Export 16x16, 32x32, 180x180, and 512x512 PNG assets.',
      'Place them in your website\'s public folder and link them with rel="icon" tags.'
    ]
  },
  {
    id: 'favicon-o-que-e',
    question: 'favicon o que é',
    category: 'favicon',
    language: 'pt',
    answer: 'Favicon é o ícone de identificação visual de um site exibido na aba do navegador, no histórico de navegação, nos favoritos e nos resultados de busca do Google no celular. Ele fortalece o reconhecimento de marca e melhora a taxa de cliques (CTR).',
    mathFormula: {
      name: 'Resolução Proporcional para Retina Display',
      formula: 'Resolucao_{display} = Base \\times DPR,  \\quad DPR \\in \\{1.0, 2.0, 3.0\\}',
      explanation: 'Em telas Retina (DPR 2.0+), um favicon clássico de 16x16 necessita de rendering a 32x32 ou formato SVG vetorial nativo.'
    },
    illustratorSteps: [
      'Desenhe seu símbolo centralizado em prancheta de 512x512px.',
      'Evite textos longos ou detalhes muito finos que desaparecem em 16px.',
      'Exporte em SVG e use o SvgFav.com para gerar o pacote ZIP com favicon.ico e manifest.'
    ],
    photoshopSteps: [
      'Crie um documento 512x512px com fundo transparente.',
      'Desenhe seu logotipo com alto contraste.',
      'Exporte como PNG transparente e converta no gerador de favicon online do SvgFav.'
    ]
  },
  {
    id: 'o-que-e-favicon',
    question: 'o que é favicon',
    category: 'favicon',
    language: 'pt',
    answer: 'O favicon (favorite icon) é a assinatura visual compacta de uma página web. Ele atua como um micro-logotipo que ajuda os usuários a identificarem rapidamente suas abas abertas entre dezenas de páginas no Chrome, Firefox, Safari ou Edge.',
    illustratorSteps: [
      'Trabalhe com traços grossos e cores saturadas para máxima legibilidade.',
      'Exporte como SVG escalável com atributos de estilo inline.',
      'Gere o arquivo favicon.ico binário para compatibilidade total com navegadores legados.'
    ],
    photoshopSteps: [
      'Verifique a legibilidade visual reduzindo o zoom de visualização para 6.25% ou 12.5%.',
      'Salve como PNG-24 e importe no gerador de favicon.'
    ]
  },
  {
    id: 'o-que-e-favicon-do-site',
    question: 'o que é favicon do site',
    category: 'favicon',
    language: 'pt',
    answer: 'O favicon do site é o arquivo de ícone principal configurado na tag <head> do código HTML. Ele é renderizado pelos navegadores nas abas, pelos agregadores de feeds RSS, pelo Googlebot em buscas móveis e pelos sistemas operacionais móveis quando o usuário adiciona o site à tela inicial.',
    codeSnippet: {
      language: 'html',
      code: '<link rel="icon" href="/favicon.ico" sizes="32x32">\n<link rel="icon" href="/favicon.svg" type="image/svg+xml">\n<link rel="apple-touch-icon" href="/apple-touch-icon.png">'
    },
    illustratorSteps: [
      'Defina as margens de respiro (padding) em cerca de 8 a 10% da prancheta.',
      'Exporte o arquivo SVG mestre e faça download do pacote pronto no SvgFav.'
    ],
    photoshopSteps: [
      'Utilize a ferramenta de corte (Crop Tool) quadrada 1:1 antes da exportação.'
    ]
  },
  {
    id: 'was-ist-ein-favicon',
    question: 'Was ist ein Favicon?',
    category: 'favicon',
    language: 'de',
    answer: 'Ein Favicon (kurz für "Favorite Icon") ist das kleine Markenzeichen einer Website, das links im Browser-Tab, in den Lesezeichen, in der Chronik und in den mobilen Google-Suchergebnissen angezeigt wird. Moderne Webstandards setzen auf eine Kombination aus SVG-Favicon für Schärfe und ICO-Datei für maximale Abwärtskompatibilität.',
    mathFormula: {
      name: 'Struktur des binären ICO-Formats',
      formula: '\\text{Header (6 Bytes)} + \\sum_{i=1}^{N} \\text{ICONDIRENTRY (16 Bytes)} + \\text{Bild-Bitmaps}',
      explanation: 'Ermöglicht das nahtlose Bündeln mehrerer Bildauflösungen (16x16, 32x32, 48x48) in einer einzelnen physischen Datei.'
    },
    illustratorSteps: [
      'Gestalten Sie ein prägnantes quadratisches Vektor-Icon (z.B. 512x512px).',
      'Vereinfachen Sie feine Details, damit das Motiv bei 16x16 Pixeln sofort erkennbar bleibt.',
      'Exportieren Sie als SVG und laden Sie es in SvgFav hoch, um das fertige Favicon-Paket zu erhalten.'
    ],
    photoshopSteps: [
      'Erstellen Sie ein neues quadratisches Dokument mit transparentem Hintergrund.',
      'Exportieren Sie das Bild als PNG und erzeugen Sie mit SvgFav die echte Multi-Frame .ico-Datei.'
    ]
  },
  {
    id: 'favicon-was-ist-das',
    question: 'favicon was ist das',
    category: 'favicon',
    language: 'de',
    answer: 'Ein Favicon ist das Website-Icon, das Browser zur visuellen Identifizierung im Tab-Reiter verwenden. Es sorgt für professionelles Branding, stärkt das Nutzervertrauen und erleichtert Besuchern das Auffinden der gewünschten Website unter vielen geöffneten Reitern.',
    codeSnippet: {
      language: 'html',
      code: '<link rel="icon" type="image/svg+xml" href="/favicon.svg">\n<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">\n<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">'
    },
    illustratorSteps: [
      'In Illustrator als SVG abspeichern.',
      'Die HTML-Meta-Tags in den <head>-Bereich Ihrer Website einbinden.'
    ],
    photoshopSteps: [
      'Nutzen Sie "Für Web speichern (Alt+Umschalt+Strg+S)" und wählen Sie PNG-24 mit Transparenz.'
    ]
  },

  // --- Conversion Questions (EN, PT, DE) ---
  {
    id: 'where-to-convert-png-to-svg',
    question: 'where to convert png to svg',
    category: 'converter',
    language: 'en',
    answer: 'You can convert PNG to SVG directly on SvgFav.com (at /png-to-svg). SvgFav operates 100% in your browser using local WebAssembly and HTML5 Canvas engines. Unlike server-based tools like Picsvg or Convertio, your images are never uploaded to any remote server, there are no file size limits, and conversion is instantaneous.',
    mathFormula: {
      name: 'ITU-R BT.709 Relative Luminance Grayscale Conversion',
      formula: 'Y = 0.2126 \\cdot R + 0.7152 \\cdot G + 0.0722 \\cdot B',
      explanation: 'Used to determine binary edge thresholds (T_lum) for tracing vector contour boundaries from raster pixel matrices.'
    },
    illustratorSteps: [
      'Open Adobe Illustrator and place your PNG image (File > Place).',
      'Select the image and open Window > Image Trace.',
      'Select Preset: "Black and White Logo" or "High Color" depending on design complexity.',
      'Click "Expand" in the control bar to convert traced paths into editable vector outlines.',
      'Go to File > Save As > SVG.'
    ],
    photoshopSteps: [
      'Open your PNG in Adobe Photoshop.',
      'Use the Magic Wand or Quick Selection tool to select the silhouette.',
      'Go to the Paths panel and click "Make work path from selection" (tolerance 1.0 px).',
      'Choose File > Export > Paths to Illustrator, then open in Illustrator and save as SVG.',
      'Alternatively, upload your PNG to SvgFav.com for 1-click automatic vectorization without Adobe software.'
    ]
  },
  {
    id: 'how-to-convert-png-to-svg',
    question: 'how to convert png to svg',
    category: 'converter',
    language: 'en',
    answer: 'To convert a PNG into an SVG vector: 1. Upload your PNG to SvgFav.com/png-to-svg. 2. The client-side vectorizer detects pixel luminance thresholds and traces boundary contours. 3. Adjust smoothing and threshold controls in real time using the interactive dual-canvas slider. 4. Download your crisp SVG vector master file.',
    mathFormula: {
      name: 'Potrace / Moore-Neighbor Boundary Contour Tracing',
      formula: 'P_{k+1} = \\arg\\min_{p \\in N(P_k)} \\{ \\theta(p - P_k) \\mid \\text{pixel}(p) = 1 \\}',
      explanation: 'Scans contiguous 8-connected boundary pixels to synthesize continuous smooth vector loop paths.'
    },
    illustratorSteps: [
      'Place your PNG in Illustrator.',
      'Navigate to Object > Image Trace > Make and Expand.',
      'Use the Direct Selection Tool (A) to delete unwanted background paths.',
      'Save as SVG with Presentation Attributes.'
    ],
    photoshopSteps: [
      'Load PNG selection via Ctrl+Click on layer thumbnail.',
      'Convert to Work Path (tolerance 1.5 - 2.0).',
      'Export via File > Export As > SVG.'
    ]
  },
  {
    id: 'como-converter-png-para-svg',
    question: 'Como converter PNG para SVG',
    category: 'converter',
    language: 'pt',
    answer: 'Para converter PNG em SVG gratuitamente: 1. Acesse SvgFav.com/png-to-svg. 2. Arraste e solte seu arquivo PNG. 3. O motor embutido rastreia automaticamente as bordas e calcula curvas de Bézier suaves 100% no seu navegador sem enviar dados a servidores externos. 4. Ajuste os filtros de suavização e clique em "Baixar SVG".',
    mathFormula: {
      name: 'Algoritmo de Suavização de Cantos de Bézier',
      formula: 'C_1 = P_i + \\frac{1}{3}(P_{i+1} - P_{i-1}), \\quad C_2 = P_{i+1} - \\frac{1}{3}(P_{i+2} - P_i)',
      explanation: 'Calcula pontos de controle tangenciais contínuos garantindo transições suaves entre nós adjacentes.'
    },
    illustratorSteps: [
      'No Illustrator, insira seu PNG com Arquivo > Inserir.',
      'Clique em "Vetorização de Imagem" na barra superior.',
      'Clique no botão "Expandir" para transformar em traçados vetoriais editáveis.',
      'Acesse Arquivo > Salvar Como e escolha formato SVG.'
    ],
    photoshopSteps: [
      'Abra a imagem no Photoshop e selecione a área desejada.',
      'No painel Demarcadores, converta a seleção em Demarcador de Trabalho.',
      'Vá em Arquivo > Exportar > Demarcadores para o Illustrator, ou utilize o conversor online SvgFav.com.'
    ]
  },
  {
    id: 'wie-konvertiert-man-png-in-svg',
    question: 'Wie konvertiert man PNG in SVG?',
    category: 'converter',
    language: 'de',
    answer: 'So konvertieren Sie eine PNG-Datei in ein SVG-Vektorbild: 1. Öffnen Sie SvgFav.com/png-to-svg. 2. Ziehen Sie Ihre PNG-Grafik in das Upload-Feld. 3. Der browserbasierte Algorithmus erkennt Pixelübergänge und berechnet mathematische Vektorpfade ohne Datenupload auf entfernte Server. 4. Passen Sie Schwellenwert und Glättung im Dual-Canvas an und laden Sie die fertige SVG-Datei herunter.',
    mathFormula: {
      name: 'Schwellenwert-Binarisierung (Otsu-Verfahren)',
      formula: '\\sigma_w^2(t) = \\omega_0(t)\\sigma_0^2(t) + \\omega_1(t)\\sigma_1^2(t)',
      explanation: 'Findet den optimalen Trennwert t, um Vordergrund-Pixel mathematisch scharf vom Hintergrund zu trennen.'
    },
    illustratorSteps: [
      'Öffnen Sie Illustrator und platzieren Sie das PNG (Datei > Platzieren).',
      'Wählen Sie Fenster > Bildnachzeichner und stellen Sie den Modus auf "Farbe" oder "Schwarzweiß".',
      'Klicken Sie in der Steuerungsleiste auf "Umwandeln" (Expand).',
      'Wählen Sie Datei > Speichern unter > SVG (.svg).'
    ],
    photoshopSteps: [
      'Wählen Sie das Motiv mit dem Schnellauswahl-Werkzeug (W) aus.',
      'Im Pfade-Bedienfeld auf "Arbeitspfad aus Auswahl erstellen" klicken.',
      'Wählen Sie Datei > Exportieren > Pfade -> Illustrator, oder nutzen Sie direkt den kostenlosen Konverter auf SvgFav.com.'
    ]
  },
  // --- Spanish FAQs ---
  {
    id: 'que-es-un-archivo-svg',
    question: '¿Qué es un archivo SVG y por qué es superior a formatos rasterizados?',
    category: 'svg',
    language: 'es',
    answer: 'Un archivo SVG (Scalable Vector Graphics) es un estándar vectorial abierto basado en código XML estándar de la W3C. A diferencia de PNG o JPG que se forman con cuadrículas fijas de píxeles, el SVG define formas geométricas y curvas de Bézier mediante fórmulas matemáticas, lo que permite escalarlo a cualquier resolución sin pérdida de calidad.',
  },
  {
    id: 'como-convertir-png-a-svg-es',
    question: '¿Cómo convertir PNG o JPG a SVG en línea gratis?',
    category: 'converter',
    language: 'es',
    answer: 'Con SvgFav puedes convertir imágenes PNG y JPG a vectores SVG directamente en tu navegador. El motor utiliza Canvas y WebAssembly en tu propio dispositivo para calcular los contornos y generar código SVG limpio sin subir archivos a ningún servidor externo.',
  },
  {
    id: 'que-es-un-favicon-es',
    question: '¿Qué es un favicon y qué tamaños son necesarios?',
    category: 'favicon',
    language: 'es',
    answer: 'Un favicon es el icono de identidad visual que los navegadores muestran en las pestañas, marcadores y accesos directos móviles. El conjunto estándar moderno incluye favicon.ico binario multi-resolución (16x16, 32x32, 48x48), SVG para pantallas Retina y apple-touch-icon (180x180) para dispositivos Apple.',
  },
  {
    id: 'privacidad-svgfav-es',
    question: '¿SvgFav almacena mis archivos o imágenes en sus servidores?',
    category: 'converter',
    language: 'es',
    answer: 'No, bajo ninguna circunstancia. Todas las operaciones de rasterización, optimización y vectorización se ejecutan 100% en el navegador del cliente. Ninguna imagen, logotipo o archivo SVG sale de tu computadora, garantizando total privacidad y cumplimiento del RGPD.',
  },
  // --- French FAQs ---
  {
    id: 'quest-ce-qu-un-fichier-svg',
    question: "Qu'est-ce qu'un fichier SVG et pourquoi est-il supérieur aux formats matriciels ?",
    category: 'svg',
    language: 'fr',
    answer: "Un fichier SVG (Scalable Vector Graphics) est un format vectoriel ouvert basé sur XML recommandé par le W3C. Contrairement aux images matricielles PNG ou JPEG composées de pixels fixes, le SVG décrit des lignes, courbes de Bézier et formes par des équations mathématiques, permettant un redimensionnement infini sans aucune dégradation de netteté.",
  },
  {
    id: 'comment-convertir-png-en-svg-fr',
    question: 'Comment convertir une image PNG ou JPG en SVG gratuitement en ligne ?',
    category: 'converter',
    language: 'fr',
    answer: "Grâce à SvgFav, vous pouvez vectoriser vos images PNG et JPG directement dans votre navigateur. Le moteur analyse les contours via HTML5 Canvas et WebAssembly sur votre processeur local pour créer des tracés vectoriels parfaits sans envoyer le moindre fichier sur un serveur distant.",
  },
  {
    id: 'quest-ce-qu-un-favicon-fr',
    question: "Qu'est-ce qu'un favicon et quels formats sont recommandés ?",
    category: 'favicon',
    language: 'fr',
    answer: "Un favicon est la petite icône d'identité visuelle affichée dans les onglets de navigateur, les favoris et les résultats de recherche. Un pack complet moderne requiert un fichier binaire favicon.ico multi-tailles (16x16, 32x32, 48x48), un fichier vectoriel favicon.svg et une icône apple-touch-icon de 180x180 pixels.",
  },
  {
    id: 'confidentialite-svgfav-fr',
    question: 'Mes fichiers graphiques sont-ils envoyés sur un serveur distant ?',
    category: 'converter',
    language: 'fr',
    answer: "Absolument jamais. SvgFav fonctionne à 100% côté client au sein de votre navigateur web. Vos créations, marques et logos sensibles ne quittent jamais votre machine, assurant une conformité totale avec le RGPD européen.",
  }
];
