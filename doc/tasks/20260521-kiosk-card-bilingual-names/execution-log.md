BDD: kiosk cards render bilingual product labels -> Given each current kiosk base product label has one authoritative Chinese and English name pair from IntRuoyi / When the kiosk gallery renders / Then every card must show the current-language product name in the bottom-left label area.

BDD: kiosk name toggle switches visible product names -> Given the kiosk page exposes a compact Chinese-English name toggle / When the user switches the toggle / Then gallery card labels, card aria-labels, and the detail title must switch to the selected language.

BDD: kiosk name toggle persists across reload -> Given the user selected the English naming mode / When the kiosk page reloads / Then the selected naming language must be restored from local storage.

RED: `@'
$targets = @(
  "导入鞘套组",
  "亲水导管",
  "塑形导管",
  "输送组件",
  "球囊扩张导管",
  "微导丝",
  "支架系统",
  "血栓回收装置",
  "封堵器组件",
  "三通连接件",
  "压力延长管",
  "冲洗回路"
)
$targets | ForEach-Object {
  docker exec int-ruoyi-mysql mysql --default-character-set=utf8mb4 -uroot -p123456 -D ruoyi-vue-pro -N -e "SELECT DISTINCT product_id, name_cn, name_en FROM showroom_product_revision WHERE deleted = b'0' AND name_cn LIKE '%$_%';"
}
'@ | powershell -` -> FAIL, the authoritative `IntRuoyi` audit did not produce a unique one-to-one bilingual mapping for the current kiosk base labels, so frontend implementation cannot proceed without inventing English names.

INFO: decoded current kiosk base labels from `src/medical-kiosk.js` -> `导入鞘套组` / `亲水导管` / `塑形导管` / `输送组件` / `球囊扩张导管` / `微导丝` / `支架系统` / `血栓回收装置` / `封堵器组件` / `三通连接件` / `压力延长管` / `冲洗回路`

INFO: blocking evidence from `IntRuoyi`
- `导入鞘套组` returned multiple sheath-style candidates such as `一次性使用导管鞘套装` / `股动脉鞘套装` / `桡动脉鞘套装`.
- `亲水导管` returned multiple catheter-style candidates such as `亲水涂层造影导管` / `亲水涂层血管造影导管` / `亲水涂层导引导管`.
- `输送组件` returned multiple delivery-style candidates such as `经导管主动脉瓣膜输送系统` / `输送导管` / `神经输送支架微导管`.
- `球囊扩张导管` returned multiple product candidates such as `PTCA球囊扩张导管` / `心脏瓣膜球囊扩张导管` / `咽鼓管球囊扩张导管`.
- `微导丝` returned multiple candidates such as `微导丝CG` / `微导丝TG` / `一次性使用血管内微导丝`.
- `支架系统` returned multiple candidates such as `胸主动脉覆膜支架系统` / `Grency髂静脉支架系统` / `颅内支架系统`.
- `血栓回收装置`, `封堵器组件`, `三通连接件`, `压力延长管`, and `冲洗回路` also lack a single exact authoritative same-name match in the current source data.

BLOCKER: implementation paused per task assumption and global no-fallback policy. No frontend code or tests were changed because the required bilingual source mapping is not decision-complete.
