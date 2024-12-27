    (function monitorPerformanceAndSecurity() {
        const scriptsToMonitor = [
            "https://adtech.adtechmanagementadvertisements.workers.dev/createdivs.js",
            "https://adtech.adtechmanagementadvertisements.workers.dev/gpt-loader.js",
            "https://adtech.adtechmanagementadvertisements.workers.dev/contentamp.js"
        ];

        // Função para monitorar o desempenho de um script
        const logMetricsForScript = (scriptUrl) => {
            const entries = performance.getEntriesByType("resource");
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
                console.warn(`O script ${scriptUrl} ainda não foi carregado ou não gerou métricas no Performance API.`);
            }
        };

        // Verificação e monitoramento de cada script
        const monitorScripts = () => {
            scriptsToMonitor.forEach(scriptUrl => {
                const scriptElement = document.querySelector(`script[src="${scriptUrl}"]`);
                if (scriptElement) {
                    console.log(`Script encontrado: ${scriptUrl}`);
                    logMetricsForScript(scriptUrl);
                } else {
                    console.warn(`Script não encontrado: ${scriptUrl}`);
                }
            });
        };

        // Análise de Erros
        const analyzeErrors = () => {
            window.addEventListener("error", event => {
                if (event.target.tagName === "SCRIPT" && scriptsToMonitor.includes(event.target.src)) {
                    console.error(`Erro detectado no script: ${event.target.src} - ${event.message}`);
                }
            });

            window.addEventListener("unhandledrejection", event => {
                console.error("Promessa rejeitada sem tratamento:", event.reason);
            });
        };

        // Execução do Monitoramento
        window.addEventListener("load", () => {
            console.group("Relatório de Monitoramento dos Scripts");
            console.log("Iniciando monitoramento detalhado dos scripts...");
            monitorScripts();
            console.groupEnd();
        });

        analyzeErrors();
    })();
