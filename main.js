const submitButton = document.querySelector(".send");
const userInput = document.querySelector(".url-inp");
const reqResDiv = document.querySelector(".req-res");
const reqDiv = document.querySelectorAll(".req-res-wrapper")[0];
const resDiv = document.querySelectorAll(".req-res div")[2];
const select = document.querySelector("select");
const get = document.querySelectorAll("select option")[0];
const post = document.querySelectorAll("select option")[1];
const reqBody = document.querySelector("textArea");
const resBody = document.querySelector(".res-body p");

submitButton.addEventListener("click", () => {
    let method = select.value;
    let url = userInput.value;
    console.log(method, url);
    if (method === "GET") {
        $.ajax({
            url,
            method,
        }).done((res) => {
            let data = JSON.stringify(res.data, true, 2);
            console.log(data);
            resBody.innerText = data;
        });
    } else if (method === "POST") {
        let data = reqBody.value;
        data = data.replace(/[\s\"]/, "");
        let jsonData = JSON.parse(data);
        console.log(jsonData);
        $.ajax({
            url,
            method,
            data: jsonData,
        }).done((data) => {
            let jsonData = JSON.stringify(data, true, 2);
            console.log(jsonData);
            resBody.innerText = jsonData;
        });
    }
});

get.addEventListener("click", () => {});

select.addEventListener("change", () => {
    if (select.options.length == 3) {
        select.remove(select.options[0]);
    }
    resBody.innerHTML = "";
    reqBody.innerHTML = "";
    if (select.value === "GET") {
        reqDiv.setAttribute("class", "d-none");
        resDiv.setAttribute("class", "req-res-wrapper");
        reqResDiv.style.justifyContent = "start";
    } else if (select.value === "POST") {
        reqResDiv.style.justifyContent = "center";
        resDiv.setAttribute("class", "req-res-wrapper");
        reqDiv.setAttribute("class", "req-res-wrapper");
    }
});
