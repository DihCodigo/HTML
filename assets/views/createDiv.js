document.addEventListener("DOMContentLoaded", function() {
    // Cria uma nova div
    var newDiv = document.createElement('div');
    newDiv.id = 'dynamicDiv'; // Atribui um ID à nova div
    newDiv.textContent = 'Essa é uma div criada dinamicamente!';
    newDiv.style.marginTop = '20px';
    newDiv.style.padding = '20px';
    newDiv.style.border = '1px solid #ccc';
    
    // Define onde a div será inserida. Exemplo: antes da div 'status'
    var statusElement = document.getElementById('status');
    if (statusElement) {
        statusElement.parentNode.insertBefore(newDiv, statusElement);
    }
});
