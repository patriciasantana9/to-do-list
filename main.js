const texto = document.querySelector("input");
const btnInsert = document.querySelector(".divInsert button");
const btnDeleteAll = document.querySelector(".header button");
const ul = document.querySelector("ul");

var itensDB = []; //array

btnDeleteAll.onclick = () => {
    itensDB = [];
    updateDB();
};
texto.addEventListener("keypress", (e) => {
    //arrow function
    if (e.key == "Enter" && texto.value != "") {
        setItemDB(); 
    }
});

btnInsert.onclick = () => {
    //anônima
    if (texto.value != "") {
        setItemDB();
    }
};

function setItemDB() {
    if (itensDB.length > 20) {
        //alerta de limite de itens
        alert("Limite máximo de 20 itens atingido!");
        return; //retorna o que ou a quê?
    }

    itensDB.push({ item: texto.value, status: "" }); //acréscimo de itens em Itemcom array
    updateDB(); //chamar função pra atualizar
}

function updateDB() {
    localStorage.setItem("todolist", JSON.stringify(itensDB)); //colocar item no banco
    loadItens();
}
function loadItens() {
    ul.innerHTML = ""; //pra não duplicar itens na tela
    itensDB = JSON.parse(localStorage.getItem("todolist")) ?? [];
    itensDB.forEach((item, i) => {
        //em cada item do banco pra criar a lstagem
        insertItemTela(item.item, item.status, i); //o item passará o índice e o status
    });
}

//função para inserir itens em formato li
function insertItemTela(text, status, i) {
    const li = document.createElement("li");

    li.innerHTML = `
    <div class="divLi">
        <input type="checkbox" ${status} data-i=${i} onchange="done(this, ${i});" />
        <span data-si=${i}> ${text} </span>
        <button onclick="removeItem(${i})" data-i=${i}><i class="bx bx-trash"></i></button>
    </div>
    `;
    ul.appendChild(li);

    if (status) {
        document
            .querySelector(`[data-si="${i}"]`)
            .classList.add("line-through");
    } else {
        document
            .querySelector(`[data-si="${i}"]`)
            .classList.remove("line-through");
    }

    texto.value = "";
}
function done(chk, i) {
    if (chk.checked) {
        itensDB[i].status = "checked";
    } else {
        itensDB[i].status = "";
    }

    updateDB(); //chamar função em todo caso
}

function removeItem(i) {
    itensDB.splice(i, 1);
    updateDB();
}

loadItens();
