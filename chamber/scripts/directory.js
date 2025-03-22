$(document).ready(function() {
    // Cargar los miembros desde el archivo JSON
    $.getJSON('./data/members.json', function(data) {
        let members = data;

        // Función que retorna un logo aleatorio
        function getRandomLogo() {
            const logos = [
                "https://dummyimage.com/150x150/000/fff.png&text=Logo+1",
                "https://dummyimage.com/150x150/007bff/fff.png&text=Logo+2",
                "https://dummyimage.com/150x150/28a745/fff.png&text=Logo+3",
                "https://dummyimage.com/150x150/dc3545/fff.png&text=Logo+4"
            ];
            return logos[Math.floor(Math.random() * logos.length)];
        }

        // Función para generar la tarjeta de cada miembro utilizando un logo aleatorio
        function generateMemberCard(member) {
            return `
                <div class="col-md-4 member-card">
                    <div class="card">
                        <img src="${getRandomLogo()}" class="card-img-top" alt="${member.name}">
                        <div class="card-body">
                            <h5 class="card-title">${member.name}</h5>
                            <p class="card-text">${member.address}</p>
                            <p><strong>Teléfono:</strong> ${member.phone}</p>
                            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                            <p><strong>Miembro Nivel:</strong> ${member.membership_level}</p>
                            <p>${member.extra_info}</p>
                        </div>
                    </div>
                </div>
            `;
        }

        // Función para mostrar los miembros en formato de cuadrícula
        function displayMembersInGrid() {
            let directoryContent = '';
            members.forEach(member => {
                directoryContent += generateMemberCard(member);
            });
            $('#directory-container').html(directoryContent);
        }

        // Función para mostrar los miembros en formato de lista
        function displayMembersInList() {
            let directoryContent = '';
            members.forEach(member => {
                directoryContent += `
                    <div class="member-list-item">
                        <h5>${member.name}</h5>
                        <p><strong>Dirección:</strong> ${member.address}</p>
                        <p><strong>Teléfono:</strong> ${member.phone}</p>
                        <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
                        <p><strong>Miembro Nivel:</strong> ${member.membership_level}</p>
                        <p>${member.extra_info}</p>
                    </div>
                    <hr>
                `;
            });
            $('#directory-container').html(directoryContent);
        }

        // Mostrar la vista en cuadrícula por defecto
        displayMembersInGrid();

        // Manejo de los botones para cambiar la vista
        $('#grid-view').on('click', function() {
            displayMembersInGrid();
        });

        $('#list-view').on('click', function() {
            displayMembersInList();
        });

        // Inyectar estilos CSS dinámicamente
        const css = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            main {
                margin: 0 auto;
                padding: 0.5rem;
                max-width: 700px;
                background-color: #fff;
                font-family: Roboto, Helvetica, sans-serif;
            }

            .menu {
                margin: 1rem auto;
                border: 1px solid rgba(0, 0, 0, 0.1);
                padding: 0.5rem;
                background-color: #bed;
                text-align: center;
            }

            .menu button {
                padding: 1rem;
                font-weight: 700;
            }

            section {
                border: 1px solid rgba(0, 0, 0, 0.1);
                padding: 0.5rem;
                background-color: #eee;
            }

            .grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                grid-gap: 5px;
                align-items: center;
            }

            .grid section {
                text-align: center;
            }

            .grid img {
                border: 1px solid #fff;
                box-shadow: 0 0 10px #333;
            }

            .grid section > * {
                margin: 0.1rem;
            }

            .grid h3 {
                font-family: "Caveat", cursive;
            }

            .list {
                display: flex;
                flex-direction: column;
            }

            .list section {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr;
                margin: 0;
                padding: 0.25rem;
            }

            .list section > * {
                margin: 0 1rem;
            }

            .list section img {
                display: none; /* para dispositivos con viewports pequeños */
            }

            .list section h3 {
                font-size: 1rem;
                font-family: Roboto, Helvetica, sans-serif;
            }

            .list section:nth-child(even) {
                background-color: #bed;
            }

            section h3 {
                font-size: 1.5rem;
            }

            section p {
                font-weight: 600;
                font-size: smaller;
            }

            section a {
                font-family: "Roboto", Arial, sans-serif;
                font-size: 0.85rem;
                color: navy;
                letter-spacing: 1.1pt;
            }

            img {
                height: 75px;
                max-width: 100%;
            }
        `;

        // Crear un elemento de estilo y agregarlo al head
        const styleSheet = document.createElement("style");
        styleSheet.type = "text/css";
        styleSheet.innerText = css;
        document.head.appendChild(styleSheet);
    }).fail(function() {
        alert("Hubo un error al cargar los datos.");
    });
});
