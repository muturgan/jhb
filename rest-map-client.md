api/admin/users              <!-- получить список пользователей по get-запросу, -->
                             <!-- создать нового пользователя по post-запросу -->
api/admin/users?items_per_page=25
api/admin/users?role=<any role>&items_per_page=25
api/admin/users/:id (:name)   <!-- получить данные о пользователе по get-запросу,
                              обновить данные о пользователе по put-запросу
                              удалить пользователя по delete-запросу -->

---------------

api/admin/fw/projects         <!-- получить список проектов по get-запросу,
                              создать новый проект по post-запросу -->
api/admin/fw/projects?items_per_page=25
api/admin/fw/projects?design=<any design>
                &house=<any house>
                &brand=<any brand>
                &model=<any model>
                &oem=<any oem>
                &platform=<any platform>
                &language=<any language>
                &date_from=<any date>
                &date_to=<any date>
                &region=<any region>
                &items_per_page=25
api/admin/fw/projects/:id     <!-- получить данные о проекте по get-запросу,
                              обновить данные о проекте по put-запросу
                              удалить проект по delete-запросу -->


api/admin/fw/versions         <!-- получить список версий по get-запросу,
                              создать новую версию по post-запросу -->
api/admin/fw/versions?items_per_page=25
api/admin/fw/versions?design=<any design>
                &house=<any house>
                &brand=<any brand>
                &model=<any model>
                &oem=<any oem>
                &platform=<any platform>
                &language=<any language>
                &items_per_page=25
api/admin/fw/versions/:id     <!-- получить данные о версии по get-запросу,
                              обновить данные о версии по put-запросу
                              удалить версию по delete-запросу -->
api/admin/fw/versions/push    <!-- получить данные о существующих push-уведомлениях по get-запросу,
                              создать новое push-уведомление по post-запросу -->
api/admin/fw/versions/push/:id <!-- получить данные о push-уведомлении по get-запросу,
                               обновить данные о push-уведомлении по put-запросу
                               удалить push-уведомление по delete-запросу -->


api/admin/fw/imei <!-- получить список тестов по get-запросу,
                    создать новую теста по post-запросу -->
api/admin/fw/imei?items_per_page=25
api/admin/fw/imei?design=<any design>
                &house=<any house>
                &brand=<any brand>
                &model=<any model>
                &imei=<any imei>
                &items_per_page=25
api/admin/fw/imei/:id <!-- получить данные о тесте по get-запросу,
                        обновить данные о тесте по put-запросу
                        удалить тест по delete-запросу -->

---------------------------------

api/admin/app/projects   <!--получить список проектов по get-запросу,
                         создать новый проект по post-запросу -->
api/admin/app/projects?items_per_page=25
api/admin/app/projects?design=<any design>
                &house=<any house>
                &brand=<any brand>
                &model=<any model>
                &imei=<any imei>
                &items_per_page=25
api/admin/app/projects/:id   <!-- получить данные о проекте по get-запросу,
                             обновить данные о проекте по put-запросу
                             удалить проект по delete-запросу -->

api/admin/app/app            <!--получить список приложений по get-запросу,
                             создать новое приложение по post-запросу -->
api/admin/app/app/:id        <!-- получить данные о приложении по get-запросу,
                             обновить данные о приложении по put-запросу
                             удалить приложение по delete-запросу -->

---------------------------------

страница statistics/project стучится на api/admin/fw/projects

api/admin/models
api/admin/models?items_per_page=25
api/admin/models?model=<any model>
                &platform=<any platform>
                &items_per_page=25
api/admin/models/:id


----------------------------

api/admin/news                <!-- получить список новостей по get-запросу -->
                              <!-- опубликовать новость по post-запросу -->
api/admin/news?items_per_page=25
        &category=<any category>
        &design=<any design>
        &house=<any house>
        &brand=<any brand>
        &model=<any model>
        &oem=<any oem>
api/admin/news/:id            <!-- получить новость по get-запросу -->

