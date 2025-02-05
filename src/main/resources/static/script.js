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

      fetch("/generatePlaylist",{
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ text: userInput})
      })
          .then(response => response.json())
          .then(data =>{
              document.getElementById("playlistResult").innerHTML =
                  `추천 플레이리스트: <a href="${data.playlistUrl}" target="_blank">${data.playlistUrl}</a>`;
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
