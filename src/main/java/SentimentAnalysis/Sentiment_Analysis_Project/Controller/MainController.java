package SentimentAnalysis.Sentiment_Analysis_Project.Controller;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
public class MainController {

    @GetMapping("/music")
    public String showMusicPage(Model model) {
        model.addAttribute("title", "AI 음악 플레이리스트 추천");
        return "music_list";
    }

    @PostMapping("/generatePlaylist")
    @ResponseBody
    public ResponseEntity<Map<String, String>> generatePlaylist(@RequestBody Map<String, String> request){
        String userInput = request.get("text");

        if (userInput == null || userInput.trim().isEmpty()) {
            System.out.println("비어있음");
            //System.out.println("사용자 입력: " + userInput);
        }
        String playlistUrl = "qdwqd" + userInput;

        return ResponseEntity.ok(Map.of("playlistUrl", playlistUrl));
    }
}

