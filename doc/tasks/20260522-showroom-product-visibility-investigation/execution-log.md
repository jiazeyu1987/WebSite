BDD: 展厅可见产品范围排查 -> Given 前台展厅页只显示少量产品, When 追踪 `website-config` 与后端展厅映射逻辑, Then 应明确前台展示的是“展厅映射产品子集”还是“所有已发布产品全集”。
GREEN: `GET http://127.0.0.1:48081/showroom/display/website-config` -> PASS, runtime returned `8` halls and `8` visible products; current payload contains exactly one mapped product per hall.
GREEN: `docker exec int-ruoyi-mysql mysql -uroot -p123456 -N -e "USE ruoyi-vue-pro; ..."` -> PASS, read-only counts show `showroom_hall_product = 8`, while product tables contain `191` product snapshots, `188` current revisions, and `321` published revisions.
INFO: Root cause confirmed: Website shows only the hall-mapped subset from `showroom_hall_product`, not the full set of published products.
