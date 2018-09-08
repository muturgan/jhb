api/ws                  // канал для обмена данными по websocket транспорту

api/user                // создать нового пользователя по post-запросу,
api/user/:id            // получить данные о пользователе по get-запросу,
                           обновить данные о пользователе по put-запросу,
                           удалить пользователя по delete-запросу
api/user/login          // залогиниться по post-запросу


api/news                // получить список новостей по get-запросу
api/news?items_per_page=25
        &category=<any category>
        &design=<any design>
        &house=<any house>
        &brand=<any brand>
        &model=<any model>
        &oem=<any oem>
api/news/:id            // получить новость по get-запросу


api/shop/goods          // получить список товаров по get-запросу
api/shop/goods?items_per_page=25
api/shop/goods?category=<any design>
        &sort=<descending for example>
        &criterion=<price or fame for example>
        &in_stock=true
        &items_per_page=25
api/shop/goods/:id      // получить информацию о товаре по get-запросу
                           добавить товар в корзину по post-запросу.
api/shop/orders         // получить список доступных заказов по get-запросу
api/shop/orders/:id     // получить информацию о заказе по get-запросу
                        // оплатить заказ по post-запросу


api/apps                // получить список приложений по get-запросу
api/apps?items_per_page=25
api/apps?category=<any design>
        &sort=<descending for example>
        &criterion=<fame for example>
        &category=<any category>
        &items_per_page=25
api/apps/:id            // получить информацию о приложении по get-запросу
api/apps/:id/install    // установить приложение по get-запросу
api/apps/:id/update     // обновить приложение по post-запросу


api/version             // получить информацию об актуальной версии приложения по get-запросу
                        // обновить версию приложения по post-запросу

api/support             // написать сообщение в службу поддержки по post-запросу
api/support/history     // написать сообщение в службу поддержки по post-запросу


api/partners       // получить информацию о партнерах по get-запросу
api/partners/:id   // получить информацию о партнере по get-запросу

api/company        // получить информацию о компании по get-запросу