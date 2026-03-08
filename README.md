# GDG on Campus NTPU - Member Wall

這是一個幫助社員與參與者體驗 GitHub 協作流程的開源專案。在這個工作坊中，每個人都會在網站上新增一張屬於自己的個人介紹卡片！

透過參與這個專案，你會學到：
- 如何將 Repository **Fork** 到自己的帳號
- 如何建立新的 **Branch**
- 如何提交 **Commit** 與 **Push** 
- 如何建立 **Pull Request (PR)**

---

## 🚀 你的任務

**目標：** 在網站的 `members/` 資料夾中新增一個有你資料的 JSON 檔案，然後將修改發送 Pull Request，讓網站出現你的專屬小卡片！

你可以選擇 **方法 A（在 GitHub 網站上直接編輯）** 或 **方法 B（使用本地終端機與 Git）** 來完成。

---

### 第 1 步：Fork 這個 Repository (雙重方法皆需)
在 GitHub 頁面的右上角，看到 **Fork** 按鈕，點擊他並將此 Repository 複製到你的 GitHub 帳號下面。

---

### 方法 A：直接在 GitHub 網頁上操作 (適合新手)

1. **建立新的檔案**：進入你 Fork 的 Repository 頁面，點進 `members/` 資料夾中。
2. 點擊右上角的 `Add file` > `Create new file`。
3. 在檔名處輸入 `你的ID.json` (例如 `xujk.json`)。
4. 參考 `_template.json`，在編輯區填寫你的資料：
   ```json
   {
     "id": "xujk",
     "name": "許君愷",
     "title": "社長",
     "bio": "喜歡開發與學習新技術～",
     "link": "https://github.com/xujk0217"
   }
   ```
5. **提交 Commit**：在頁面最上方點擊 `Commit changes...` 按鈕。
   - Commit message 填上 `Add member 你的ID`
   - 選取 **Create a new branch for this commit and start a pull request**
   - 將新分支命名為 `feature/你的名字`
   - 點擊 `Propose changes`。
6. 接續跳到 **第 3 步：建立 Pull Request (PR)**。

---

### 方法 B：使用 Command Line 把專案 Clone 下來編輯 (適合進階)

1. **複製專案到本機**：打開終端機，執行 clone 指令：
   ```bash
   git clone https://github.com/你的帳號/GDG-Member-Wall.git
   cd GDG-Member-Wall
   ```
2. **建立並切換 Branch**：不要修改 main 分支！建立並切換到新分支：
   ```bash
   git checkout -b feature/yourname
   ```
3. **新增你的資料檔案**：
   - 進入 `members/` 目錄。
   - 複製 `_template.json` 並改名為 `你的ID.json` (例如 `xujk.json`)。
   - 用編輯器打開填寫你的資料，與方法 A 第 4 點的內容相同。
4. **準備預覽 (非必要，但建議)**：
   自己暫時手動幫自己的 JSON 檔名加到 `members/members.json` 的名單中。透過 VS Code 的 Live Server 啟動可以看到卡片。*(確認後記得復原 `members.json` 的修改！)*
5. **Commit 與 Push**：將剛建立的檔案推送到遠端：
   ```bash
   git add members/你的ID.json
   git commit -m "Add member 你的ID"
   git push origin feature/yourname
   ```
6. 回到你 GitHub 上 Fork 出來的專案頁面，你應該會看到上方有綠色按鈕提示你可以 **Compare & pull request**，點擊它並接續 **第 3 步：建立 Pull Request (PR)**。

---

### 第 3 步：建立 Pull Request (PR)

1. 確認比較 (Compare) 的來源是你的 `feature/yourname` 分支，目標是原本專案的 `main` 分支。
2. 填寫標題與描述，確認沒問題後按下 **Create pull request**。
3. 🎉 等待管理員批准後，你的專屬卡片就會出現在首頁了！

---

## 💡 小提示 (Link 欄位動態 Icon)

你可以在 `link` 欄位填入任何你想附上的連結，網站會自動幫你判斷適合的圖示：
- 如果網址包含 `github.com`，網頁會自動顯示 GitHub 圖示與「GitHub」字樣。
- 如果網址包含 `linkedin.com`，網頁會自動顯示 LinkedIn 圖示與「LinkedIn」字樣。
- 如果網址包含 `instagram.com`，網頁會自動顯示 Instagram 圖示與「Instagram」字樣。
- 如果填寫**其他網址** (如個人網誌、Medium)，網頁會自動以**預設的「外連圖示」搭配該「網域名稱」文字**（例如 `medium.com`）呈現！
