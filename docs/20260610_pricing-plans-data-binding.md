# pricing.html / pricing_en.html 方案頁串資料說明

對應 Figma「2026/5_新增離峰方案、方案頁優化」(node 1368:19019)。
本次僅完成靜態頁面（`#pricingTitanium2026` 區塊），以下說明各區塊需要串接的資料與切換邏輯，供後續串 API。

對應檔案：
- `pricing.html`（中文）
- `pricing_en.html`（英文，結構相同，內容為英文版字串）
- 樣式：`scss/_20260610_pricingPlans.scss` → 編譯為 `css/update.css`

---

## 1. 整體狀態（每張卡各自獨立判斷）

每張卡片（`.plan-card.titanium` 鈦金 / `.plan-card.offpeak` 離峰）都有 4 種顯示狀態，
依「使用者目前訂閱狀態」+「是否有促銷活動」決定，目前都用 HTML 註解標記，
切換時用對應區塊取代/新增即可：

| 狀態 | 說明 | 對應區塊 |
|---|---|---|
| 預設（無方案） | 使用者未訂閱任一方案 | 目前已展開顯示的內容 |
| 促銷中 | 該方案目前有活動價 | `.plan-price` 改用 `.plan-price.promo` 版本（已用註解保留） |
| 已是該方案會員 | 使用者已訂閱「此卡」的方案 | `.plan-btn` 改用 `.plan-btn.disabled` 版本（文字「您目前是OOO方案會員」） |
| 已是另一方案會員 | 使用者已訂閱「另一張卡」的方案（兩方案互斥） | 在 `.plan-btn` 下方加上 `.member-tip` 提示「單一帳號僅可訂閱一種方案」 |

> 鈦金卡與離峰卡互斥：若 user 已訂閱離峰方案，則鈦金卡顯示「已是另一方案會員」狀態（顯示 member-tip），反之亦然。

---

## 2. 鈦金方案時數制卡（`.plan-card.titanium`）

### 2.1 標題區 `.plan-card-header`
| 元素 | Class | 資料來源 |
|---|---|---|
| 方案名稱 | `.plan-name` | 固定文案「鈦金方案時數制」 |
| 角標 | `.plan-tag` | 固定文案「彈性首選」 |
| 說明文字 | `.plan-desc` | 固定文案 |
| **價格** | `.plan-price .price` | **動態**：方案月費，預設 `$200` |
| 促銷價 | `.plan-price.promo`（整組替換） | **動態**：原價刪除線 `.price-old`、活動標籤 `.promo-tag`、活動價 `.price` |

### 2.2 時數資訊 `.info-box-wrap`
| 元素 | Class | 資料來源 |
|---|---|---|
| 每月基本時數 | `.info-item .num`（數字）+ `.num-unit`（單位「小時」） | **動態**：目前為 `5`，依方案設定 |
| 說明文字 | `.info-title` | 固定文案「每月基本時數」 |
| 第二格 | 固定「全天可用 / 無時段限制」 | 固定文案，無時段限制方案不需動態 |

### 2.3 方案規格 `.plan-spec-wrap .spec-list`
固定 5 條文案（伺服器規格、FPS、Reflex 等），目前無動態需求。
若未來規格會隨方案版本調整，建議改為陣列渲染 `<li>`。

### 2.4 訂閱按鈕 `.plan-btn`
| 狀態 | 內容 |
|---|---|
| 未訂閱 | 「立即訂閱」，連結導向訂閱流程，需帶方案代碼（鈦金時數制） |
| 已是會員 | class 加 `disabled`，文字改「您目前是鈦金時數制方案會員」，不可點擊 |

### 2.5 加購時數 `.addon-section`
三張 `.sub-card`，皆為**動態資料**（價格、優惠碼、折扣後價格皆可能調整）：

| Sub Card | 欄位 | Class |
|---|---|---|
| 加購 5 小時 | 名稱 `.sub-card-name`；原價 `.sub-card-price` | 無贈送/無優惠碼 |
| 加購 10 小時 | 名稱 `.sub-card-name`；贈送時數 `.sub-card-bonus`；優惠碼文案 `.sub-card-promo`；原價 `.price-old`；折後價標籤 `.price-discount-label`；折後價 `.sub-card-price.promo` |
| 加購 20 小時 | 同上結構，數值不同 |

> 優惠碼 `BOOST10X` / `BOOST20MAX` 字串目前寫死在 `.sub-card-promo` 文字中，若優惠碼會變動，
> 建議改為 `{{promoCode}}` 變數帶入。

**已是鈦金會員時**：每張 `.sub-card-right` 內加上「加購」按鈕（`.addon-btn`，目前已用註解保留），
連結需帶該檔位的加購代碼。

### 2.6 加購權益 `.benefit-section`
固定 4 條文案 + 「更多完整說明」連結（`.benefit-more`，導向 `timecapped.html` / `timecapped_en.html`），無動態需求。

### 2.7 促銷狀態下的加購提示
促銷期間，加購區塊下方需顯示 `.promo-code-tip`「輸入優惠碼【BOOST20MAX】，此區塊預留促購空間！」（目前以註解保留，由 RD 視活動是否上線切換顯示）。

---

## 3. 離峰方案卡（`.plan-card.offpeak`）

### 3.1 標題區
同鈦金卡結構，方案名稱「離峰方案」、角標「高 CP 超值選」、價格 `$200/月`（**動態**），促銷版本同樣用 `.plan-price.promo`。

### 3.2 時數資訊 `.info-box-wrap`
| 元素 | 資料來源 |
|---|---|
| 每月時數 `.num` + `.num-unit` | **動態**，目前 `50` 小時 |
| 限定時段 | 固定文案「限定時段使用 / 02:00 AM - 12:00 PM」，若離峰時段會隨方案調整則需動態 |

### 3.3 方案規格
同鈦金卡，固定 5 條文案。

### 3.4 訂閱按鈕
| 狀態 | 內容 |
|---|---|
| 未訂閱 | 「立即訂閱」，連結需帶方案代碼（離峰方案） |
| 已是會員 | class 加 `disabled`，文字改「您目前是離峰方案會員」 |
| 已是鈦金會員（互斥） | 按鈕下方加 `.member-tip`「單一帳號僅可訂閱一種方案」 |

### 3.5 權益提醒 `.benefit-section`
固定 2 條文案（固定時數規格說明、與鈦金方案互斥說明），無動態需求。
離峰方案無加購區塊。

---

## 4. 共用元件 / class 對照表

| Class | 用途 |
|---|---|
| `.plan-card.titanium` / `.plan-card.offpeak` | 卡片容器，決定配色（border/底色） |
| `.plan-tag` | 角標（彈性首選 / 高CP超值選 / 限時優惠） |
| `.plan-price` / `.plan-price.promo` | 價格區塊，promo 版本含刪除線原價 |
| `.info-box-wrap` / `.info-item` | 時數資訊兩格 |
| `.plan-spec-wrap .spec-list` | 方案規格清單（hexagon icon + 文字） |
| `.plan-btn` / `.plan-btn.disabled` | 訂閱按鈕 / 已訂閱狀態 |
| `.sub-card` / `.addon-btn` | 加購時數卡片 / 加購按鈕（會員狀態才顯示） |
| `.benefit-section` | 權益說明清單 |
| `.member-tip` / `.promo-code-tip` | 互斥提示 / 促銷提示（依狀態顯示） |

---

## 5. 圖示資源
位於 `img/pricing2026/`：`icon-clock.svg`、`icon-infinity.svg`、`icon-moon.svg`、
`icon-hexagon.svg`、`icon-circle-exclamation.svg`、`icon-spec-corner.svg`、`bg-hexagons.svg`（目前未使用，保留供版型擴充）。

---

## 6. RWD 斷點
- ≥1280px：雙卡片並排（`.plan-cards-wrap` row）
- <1280px：直向堆疊置中
- ≤768px：卡片內距縮小、`.info-box-wrap` 改為直向、`.sub-card` 改為直向排列

切版邏輯皆已寫在 `scss/_20260610_pricingPlans.scss`，不需額外處理。
