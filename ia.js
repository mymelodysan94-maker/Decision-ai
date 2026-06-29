async function perguntarIA(prompt, resultadoId) {
  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: prompt })
    });

    const data = await res.json();

    document.getElementById(resultadoId).innerText =
      data.reply || "Erro na IA";
  } catch (err) {
    document.getElementById(resultadoId).innerText =
      "Erro ao conectar com o servidor";
  }
}