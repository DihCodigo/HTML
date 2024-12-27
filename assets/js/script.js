    (function monitorPerformanceAndSecurity() {
        const scriptsToMonitor = [
            "https://adtech.adtechmanagementadvertisements.workers.dev/createdivs.js",
            "https://adtech.adtechmanagementadvertisements.workers.dev/gpt-loader.js",
            "https://adtech.adtechmanagementadvertisements.workers.dev/contentamp.js"
        ];

        // Monitoramento de Desempenho do Script
        const logMetrics = () => {
            const entries = performance.getEntriesByType("resource");
            scriptsToMonitor.forEach(scriptUrl => {
                const targetResource = entries.find(entry => entry.name === scriptUrl);

                if (targetResource) {
                    const metrics = {
                        'Tempo de carregamento (ms)': targetResource.responseEnd.toFixed(2),
                        'Tamanho transferido (KB)': (targetResource.encodedBodySize / 1024).toFixed(2),
                        'Tipo de recurso': targetResource.initiatorType,
                        'Tempo para primeira byte (TTFB) (ms)': targetResource.responseStart.toFixed(2),
                        'Duração total (ms)': targetResource.duration.toFixed(2),
                    };

                    console.table(metrics);
                } else {
                    console.warn(`O script ${scriptUrl} ainda não carregou ou não gerou métricas no Performance API.`);
                }
            });
        };

        // Monitoramento de FPS
        const monitorFPS = () => {
            let lastFrameTime = performance.now();
            let frameCount = 0;
            const fpsArray = [];

            const calculateFPS = () => {
                const now = performance.now();
                frameCount++;
                if (now - lastFrameTime >= 1000) {
                    const fps = frameCount;
                    fpsArray.push(fps);
                    console.log(`FPS atual: ${fps}`);
                    frameCount = 0;
                    lastFrameTime = now;
                }
                requestAnimationFrame(calculateFPS);
            };

            calculateFPS();

            window.addEventListener("beforeunload", () => {
                const averageFPS = (fpsArray.reduce((a, b) => a + b, 0) / fpsArray.length).toFixed(2);
                console.log(`FPS médio durante a sessão: ${averageFPS}`);
            });
        };

        // Análise de Erros
        const analyzeErrors = () => {
            window.addEventListener("error", event => {
                if (event.target.tagName === "SCRIPT" && scriptsToMonitor.includes(event.target.src)) {
                    console.error(`Erro detectado no script ${event.target.src}:`, event.message);
                }
            });

            window.addEventListener("unhandledrejection", event => {
                console.error("Promessa rejeitada sem tratamento:", event.reason);
            });
        };

        // Monitoramento do Impacto na Experiência do Usuário (UX)
        const measureUXImpact = () => {
            const timing = performance.timing;
            const uxMetrics = {
                'Tempo até DOM ser interativo (ms)': timing.domInteractive - timing.navigationStart,
                'Tempo até página carregada (ms)': timing.loadEventEnd - timing.navigationStart,
                'Tempo de renderização da página (ms)': timing.domComplete - timing.responseStart,
            };

            console.table(uxMetrics);
        };

        // Verificação de Cabeçalhos de Segurança
        const checkSecurityHeaders = () => {
            const headers = {
                "Content-Security-Policy": "Protege contra injeção de scripts.",
                "Strict-Transport-Security": "Força o uso de HTTPS.",
                "X-Content-Type-Options": "Previne o carregamento de tipos MIME incorretos.",
                "X-Frame-Options": "Protege contra cliques em iframes não autorizados.",
                "X-XSS-Protection": "Protege contra ataques XSS simples.",
                "Referrer-Policy": "Controla as informações enviadas no cabeçalho Referer.",
            };

            console.group("Verificação de Headers de Segurança");
            Object.entries(headers).forEach(([header, description]) => {
                const headerValue = document.head.querySelector(`meta[http-equiv="${header}"]`);
                if (headerValue) {
                    console.log(`${header}: Configurado (${description})`);
                } else {
                    console.warn(`${header}: Não configurado (${description})`);
                }
            });
            console.groupEnd();
        };

        // Análise de Segurança do Script
        const analyzeScriptSecurity = () => {
            scriptsToMonitor.forEach(scriptUrl => {
                const scriptElement = document.querySelector(`script[src="${scriptUrl}"]`);

                if (!scriptElement) {
                    console.error(`O script ${scriptUrl} não foi encontrado na página.`);
                    return;
                }

                const isSecure = scriptElement.src.startsWith("https://");
                console.group(`Análise de Segurança do Script: ${scriptUrl}`);
                console.log(`Carregado via HTTPS: ${isSecure ? "Sim" : "Não"}`);
                if (!isSecure) {
                    console.warn(`O script não está usando HTTPS. Isso representa um risco de segurança.`);
                }
                console.groupEnd();
            });
        };

        // Monitoramento de Atividade Suspeita
        const monitorSuspiciousActivity = () => {
            const suspiciousPatterns = [/eval\(/, /document\.write/, /atob\(/];
            const originalConsoleError = console.error;

            console.error = function (...args) {
                suspiciousPatterns.forEach(pattern => {
                    if (pattern.test(args.join(" "))) {
                        console.warn(`Comportamento suspeito detectado: ${args.join(" ")}`);
                    }
                });
                originalConsoleError.apply(console, args);
            };
        };

        // Relatório de Informações TLS
        const reportTLSInfo = async () => {
            try {
                const tlsInfo = await fetch(window.location.origin, { method: "HEAD" });
                console.group("Informações TLS e Conexão");
                console.log(`Protocolo usado: ${tlsInfo.url.startsWith("https://") ? "HTTPS" : "HTTP"}`);
                console.log(`Segurança ativa: ${tlsInfo.headers.has("Strict-Transport-Security") ? "Sim" : "Não"}`);
                console.groupEnd();
            } catch (error) {
                console.error("Erro ao verificar informações TLS:", error);
            }
        };

        // Execução do Monitoramento
        window.addEventListener("load", () => {
            console.group("Relatório de Monitoramento dos Scripts");
            console.log("Iniciando monitoramento detalhado dos scripts...");
            logMetrics();
            measureUXImpact();
            analyzeScriptSecurity();
            checkSecurityHeaders();
            reportTLSInfo();
            console.groupEnd();
        });

        monitorFPS();
        analyzeErrors();
        monitorSuspiciousActivity();
    })();
