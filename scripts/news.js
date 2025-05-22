fetch('http://localhost:3004/api/news')
.then(response => {
    return response.json();
})
.then(news => {
    const newsContainer = document.getElementById('news-container');
    if (!newsContainer) {
        console.error("Контейнер 'news-container' не найден!");
        return;
    }

    news.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('news-card');

        const shortDesc = item.NewsDescription.length > 150
            ? item.NewsDescription.substring(0, 150) + '...'
            : item.NewsDescription;

        card.innerHTML = `
            <h2>${item.NewsName}</h2>
            <p>${shortDesc}</p>
            <p>Дата: ${new Date(item.NewsDate).toLocaleDateString()}</p>
            <a class="view-button" href="/news/${item.NewsID}">Читать далее</a>
        `;

        newsContainer.appendChild(card);
    });
})
.catch(error => {
    console.error('Ошибка при получении новостей:', error);
});