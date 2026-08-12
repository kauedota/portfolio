// Selecionar a seção about
const about = document.querySelector("#about")

// Selecionar a Seção Projects
const swiperWrapper = document.querySelector(".swiper-wrapper")
// Formulário
const formulario = document.querySelector('#formulario')

// Expressão Regular de validação do e-mail
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

async function getAboutGithub() {

    try {
        const resposta = await fetch('https://api.github.com/users/kauedota')

        const perfil = await resposta.json()

        about.innerHTML = ''

        about.innerHTML = `
        <!-- Imagem da seção About -->
            <figure class="about-image">
                <img src="${perfil.avatar_url}" 
                alt="${perfil.name}">
            </figure>

            <!-- Conteúdo da seção About -->
            <article class="about-content">
                <h2>Sobre mim</h2>
                <p>Olá! Sou Kauê, um desenvolvedor Full Stack apaixonado por criar experiências
                    digitais incríveis. Com ampla experiência em tecnologias como HTML, CSS, JavaScript, Java,
                    Python e Node.js, sou capaz de transformar ideias em soluções funcionais e esteticamente
                    agradáveis.</p>
                

                <!-- Links (GitHub + Currículo) e Dados do GitHub -->
                <div class="about-buttons-data">

                    <!-- Links -->
                    <div class="buttons-container">
                        <a href="${perfil.html_url}" target="_blank" class="botao">Github</a>
                        <a href="https://docs.google.com/document/d/1U9otXdqxvFEThl2xnFcN2ijhQsWJrboB/preview" target="_blank" class="botao-outline">Currículo</a>
                    </div>
                    <!-- Dados - Repositório github -->
                    <div class="data-container">

                        <!-- Número de Seguidores -->
                        <div class="data-item">

                            <span class="data-number">${perfil.followers}</span>
                            <span class="data-label">Seguidores</span>
                        </div>

                        <!-- Número de Repositórios Públicos -->
                        <div class="data-item">

                            <span class="data-number">${perfil.public_repos}</span>
                            <span class="data-label">Repositórios</span>
                        </div>

                    </div>
                     </article>
        
        `

    } catch (error) {
        console.error("Erro ao buscar dados no GitHub", error)
    }
}

// Função Para Construção do Carrosel com o Swipper
async function getProjectsGithub() {

    try {

        const resposta = await fetch('https://api.github.com/users/kauedota/repos?sort=update&per_page=6')

        const repositorios = await resposta.json()

        swiperWrapper.innerHTML = ''

        // Ícones das linguagens
        const linguagens = {
            'JavaScript': 'javascript',
            'TypeScript': 'typescript',
            'Python': 'python',
            'Java': 'java',
            'HTML': 'html',
            'CSS': 'css',
            'PHP': 'php',
            'C#': 'csharp',
            'Go': 'go',
            'Kotlin': 'kotlin',
            'Swift': 'swift',
            'C': 'c',
            'C++': 'c_plus',
            'GitHub': 'github',
        }

        repositorios.forEach((repositorio) => {

            const linguagem = repositorio.language || 'GitHub'
            const icone = linguagens[linguagem] ?? linguagens['GitHub']
            const urlIcone = `./assets/icons/languages/${icone}.svg`

            const nomeFormatado = repositorio.name
                .replace(/[-_]/g, ' ')
                .replace(/[^a-zA-Z0-9\s]/g, '')
                .replace(/\s+t[a-z0-9]+$/i, '')
                .toUpperCase()

            const truncar = (texto, limite) => texto.length > limite
                ? texto.substring(0, limite) + '...'
                : texto

            const descricao = repositorio.description
                ? truncar(repositorio.description, 100)
                : 'Projeto desenvolvido no GitHub'

            const tags = repositorio.topics?.length > 0
                ? repositorio.topics.slice(0, 3).map(topic => `<span class="tag">${topic}</span>`).join('')
                : `<span class="tag">${linguagem}</span>`;

            const botaoDeploy = repositorio.homepage
                ? `<a href="${repositorio.homepage}" target="_blank" class="botao-outline botao-sm">Deploy</a>`
                : ''

            const botoesAcao = `
            <div class="project-buttons">
            <a href="${repositorio.html_url}" target="_blank" class="botao botao-sm">
            GitHub
            </a>
             ${botaoDeploy}
            </div>`;

            swiperWrapper.innerHTML += `
            <div class="swiper-slide">
                        <article class="project-card">
            <figure class="project-image">
            <img src="${urlIcone}"
                                alt="Ícone - ${linguagem} - Linguagem principal do projeto"
            >
            </figure>
            <div class="project-content">
                            <h3>${nomeFormatado}</h3>
            <p>${descricao}</p>
            <div class="project-tags">
                            ${tags}
            </div>
                            ${botoesAcao}
              </div>
            </article>
          </div>
      `
        })


    } catch (error) {
        console.error("Erro ao buscar os dados dos projetos no Github", error)
    }
}

function iniciarSwiper() {
    new Swiper('.projects-swiper', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 24,
        centeredSlides: false,
        loop: true,
        watchOverflow: true,

        breakpoints: {
            0: {
                slidesPerView: 1,
                slidesPerGroup: 1,
                spaceBetween: 40,
                centeredSlides: false,
            },
            769: {
                slidesPerView: 2,
                slidesPerGroup: 2,
                spaceBetween: 40,
                centeredSlides: false,
            },
            1025: {
                slidesPerView: 3,
                slidesPerGroup: 3,
                spaceBetween: 54,
                centeredSlides: false,
            },
        },

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },

        autoplay: {
            delay: 5000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
        },

        grabCursor: true,
        slidesOffsetBefore: 0,
        slidesOffsetAfter: 0,
    })
}

formulario.addEventListener('submit', function (event) {
    event.preventDefault()

    document
        .querySelectorAll('form span')
        .forEach((span) => (span.innerHTML = ''))

    let isValid = true

    const nome = document.querySelector('#nome')
    const erroNome = document.querySelector('#erro-nome')

    if (nome.value.trim().length < 3) {
        erroNome.innerHTML = 'O nome deve ter no mínimo 3 caracteres'
        if (isValid) nome.focus()
        isValid = false
    }

    const email = document.querySelector('#email')
    const erroEmail = document.querySelector('#erro-email')

    if (!email.value.trim().match(emailRegex)) {
        erroEmail.innerHTML = 'Digite um endereço de e-mail válido'
        if (isValid) email.focus()
        isValid = false
    }

    const assunto = document.querySelector('#assunto')
    const erroAssunto = document.querySelector('#erro-assunto')

    if (assunto.value.trim().length < 5) {
        erroAssunto.innerHTML =
            'O assunto deve ter no mínimo 5 caracteres'
        if (isValid) assunto.focus()
        isValid = false
    }

    const mensagem = document.querySelector('#mensagem')
    const erroMensagem = document.querySelector('#erro-mensagem')

    if (mensagem.value.trim().length === 0) {
        erroMensagem.innerHTML = 'A mensagem não pode ser vazia'
        if (isValid) mensagem.focus()
        isValid = false
    }

    if (isValid) {
        const submitButton = formulario.querySelector(
            'button[type="submit"]',
        )
        submitButton.disabled = true
        submitButton.textContent = 'Enviando...'

        formulario.submit()
    }
})


getAboutGithub();
getProjectsGithub().then(() => {
    iniciarSwiper();
});
