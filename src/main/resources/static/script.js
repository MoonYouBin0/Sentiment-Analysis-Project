function openTab(evt, tabName) {
    let tabContents = document.querySelectorAll(".tab-content");
    let tabButtons = document.querySelectorAll(".tab-button");

    tabContents.forEach(tab => tab.classList.remove("active"));
    tabButtons.forEach(button => button.classList.remove("active"));

    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// 텍스트 입력 기반 플레이리스트 추천
function generatePlaylist() {
    let userInput = document.getElementById("userInput").value;

    if (userInput.trim() === "") {
        alert("현재 상태를 입력해주세요!");
        return;
    }

        //요청을 보냈는데 현재 Fast Api controller 부분에서 CORS 설정을 해주지 않아서
        //localhost:8080 -> localhost:8000의 요청이 차단  당하는 중.
        fetch("http://localhost:8000/analyze/text/",{
      // fetch("http://localhost:8000/generatePlaylist",{
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: userInput})
      })
          .then(response => response.json())
          .then(data =>{

              const playlistElement = document.getElementById("playlistResult");

              // playlistResult가 null인지 확인
              if (!playlistElement) {
                  console.error("playlistResult 요소를 찾을 수 없습니다.");
                  return;
              }

              // data.songs 배열이 있는지 확인
              if (Array.isArray(data.songs)) {
                  playlistElement.innerHTML = ""; // 기존 내용을 비움

                  data.songs.forEach(song => {
                      const songElement = document.createElement("div");
                      songElement.innerHTML = `<strong>곡명:</strong> ${song.title} <br> <strong>아티스트:</strong> ${song.artist}`;

                      // 각 노래를 playlistResult에 추가
                      playlistElement.appendChild(songElement);
                  });
              } else {
                  console.error("songs 배열이 없습니다.");
              }
              // document.getElementById("playlistResult").innerHTML =
              //     `추천 플레이리스트: <a href="${data.playlistUrl}" target="_blank">${data.playlistUrl}</a>`;
              // data.songs.forEach(song => {
              //     const songElement = document.createElement("div");
              //     songElement.innerHTML = `<strong>곡명:</strong> ${song.title} <br> <strong>아티스트:</strong> ${song.artist}`;
              //
              //     // 각 노래를 playlistResult에 추가
              //     playlistElement.appendChild(songElement);
              // });
          })
          .catch(error => {
              console.error("Error:", error);
              alert("오류가 발생했습니다.");
          });

    /*fetch(`http://localhost:8080/api/playlist/recommend?input=${encodeURIComponent(userInput)}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("playlistResult").innerHTML =
                `추천 플레이리스트: <a href="${data.playlistUrl}" target="_blank">${data.playlistUrl}</a>`;
        })
        .catch(error => console.error("Error:", error));*/
}

// 이미지 업로드 기반 플레이리스트 추천
function generatePlaylistFromImage() {
    let fileInput = document.getElementById("imageUpload");
    let file = fileInput.files[0];

    if (!file) {
        alert("이미지를 업로드해주세요!");
        return;
    }

    // 실제 AI 분석 API가 필요하지만, 여기서는 임시 URL로 처리
    let playlistLink = "https://open.spotify.com/playlist/37i9dQZF1DXcBWIGoYBM5M";  // 랜덤 추천

    document.getElementById("playlistResultImage").innerHTML =
        `추천 플레이리스트: <a href="${playlistLink}" target="_blank">${playlistLink}</a>`;
}
