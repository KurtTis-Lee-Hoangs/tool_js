// ==UserScript==
// @name         Auto Collect
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       John D (dj455569@gmail.com)
// @match        *://*/user/0/
// @match        *://*/truyen/*/*/*/
// @icon         https://www.google.com/s2/favicons?sz=64&domain=sangtacviet.com
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    var div = document.createElement('div');
    div.id = 'notification';
    div.style = 'width: 150px;height: 240px;position: fixed;top: 0;right: 0;border: 1px solid rgb(122, 199, 241);border-radius: 5px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);padding: 15px;background-color: #f9f9f9;margin: 10px;display: none;';
    document.body.appendChild(div);

    div.onclick = function () {
        hideNotification();
    }

    var listPT = [{
        name: '【 🕳️ Ám Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa bóng tối chi lực. Bị tấn công có khả năng hấp thu sát thương.'
    }, {
        name: '【 🔥 Hỏa Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa cực nóng chi lực. Đòn tấn công mang theo thiêu đốt, gây sát thương duy trì.'
    }, {
        name: '【 🌪️ Phong Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa cực nhanh chi lực. Đòn tấn công khó có thể né tránh.'
    }, {
        name: '【 🧲 Kim Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa sắc bén chi lực. Đòn tấn công bỏ qua phòng thủ.'
    }, {
        name: '【 ✨ Quang Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa ánh sáng chi lực. Bị tấn công sẽ phản hồi sát thương.'
    }, {
        name: '【 💧 Thủy Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa mềm mại chi lực. Đòn tấn công mang theo hiệu quả làm chậm.'
    }, {
        name: '【 ⚡ Lôi Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa lôi đình chi lực. Đòn tấn công có thể gây choáng nặng.'
    }, {
        name: '【 ❄️ Băng Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa cực lạnh chi lực. Đòn tấn công có tỉ lệ gây đóng băng.'
    }, {
        name: '【 🍀 Mộc Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa cực nóng chi lực. Đòn tấn công mang theo hút máu, hồi lại máu cho bản thân.'
    }, {
        name: '【 🌍 Thổ Chi Pháp Tắc 】',
        info: 'Quy tắc trong thiên địa, ẩn chứa cực nặng chi lực. Bị tấn công giảm bớt sát thương phải chịu.'
    }]

    var showNotification = (message) => {
        var el = document.getElementById('notification');
        el.textContent = message;
        el.style.display = 'block';
        setTimeout(() => {
            el.style.display = 'none';
        }, 15000)
    }

    var hideNotification = () => {
        var el = document.getElementById('notification');
        el.style.display = 'none';
    }

    var rand = (min, max) => parseInt(Math.random() * (max - min) + min);

    var request = async (params, query) => {
        var url = '/index.php';
        if (query) {
            url = url + query;
        }
        var retry = 0;
        try {
            const response = await fetch(url, {
                "headers": {
                    "content-type": "application/x-www-form-urlencoded",
                },
                "body": params,
                "method": "POST"
            });
            if (!response.ok) {
                if (retry == 3) {
                    retry = 0;
                    throw new Error("Network response was not OK");
                }
                setTimeout(function () {
                    request(params, retry++);
                }, 1000);
            } else {
                const text = await response.text();
                try {
                    return JSON.parse(text);
                } catch {
                    return text;
                }
            }
        } catch (error) {
            console.error("There has been a problem with your fetch operation:", error);
        }
    };

    var count = 0;
    var lucky = 1;
    var intervalId;

    var startCollectItem = async () => {
        console.log("Starting request...");
        try {
            var response = await isCollectible();
            if (response.code == 1) {
                setTimeout(async () => {
                    var collectableItem = await checkItem();
                    if (collectableItem && collectableItem.info) {
                        setTimeout(() => {
                            showNotification(collectableItem.info);
                            collectItem(collectableItem);
                        }, rand(1, 5))
                    }
                }, rand(1, 5))
            }
        } catch (error) {
            console.log("error :>> ", error.message);
            //alert(error.message);
        }
    }

    var isCollectible = () => {
        var params = "ngmar=tcollect&ajax=trycollect&ngmar=iscollectable";
        var query = "?ngmar=iscollectable";
        return request(params, query);
    };

    var checkItem = () => {
        var params = "ngmar=collect&ajax=collect";
        return request(params);
    };

    // Biến để đếm số lượng vật phẩm và thời gian bắt đầu
    let itemCount = 0;
    let startTime = null;
    let itemTypesCount = {}; // Đối tượng để lưu trữ số lượng từng loài

    // Khởi tạo từ localStorage nếu có
    if (localStorage.getItem('itemCount')) {
        itemCount = parseInt(localStorage.getItem('itemCount'), 10);
    }
    if (localStorage.getItem('startTime')) {
        startTime = parseInt(localStorage.getItem('startTime'), 10);
    }
    if (localStorage.getItem('itemTypesCount')) {
        itemTypesCount = JSON.parse(localStorage.getItem('itemTypesCount'));
    }

    // Hàm cập nhật số lượng vật phẩm nhặt được và thời gian đã trôi qua
    function updateItemCounter() {
        let elapsedTime = startTime ? Math.floor((Date.now() - startTime) / 60000) : 0; // Tính thời gian bằng phút và làm tròn xuống
        let itemTypesText = Object.entries(itemTypesCount).map(([type, count]) => `${type}: ${count} cái`).join('\n');
        itemCounterDiv.textContent = `Tổng số vật phẩm nhặt được: ${itemCount} item\nThời gian đã trôi qua: ${elapsedTime} phút\n${itemTypesText}`;

        // Lưu dữ liệu vào localStorage
        localStorage.setItem('itemCount', itemCount);
        localStorage.setItem('startTime', startTime);
        localStorage.setItem('itemTypesCount', JSON.stringify(itemTypesCount));
    }

    // Hàm để lấy tên loài từ vật phẩm
    function getItemTypeName(collectableItem) {
        return collectableItem.name;
    }


    var collectItem = (collectableItem) => {
        count++;

        itemCount++;
        if (!startTime) {
            startTime = Date.now();
        }

        // Cập nhật số lượng từng loài
        let itemTypeName = getItemTypeName(collectableItem);
        if (itemTypesCount[itemTypeName]) {
            itemTypesCount[itemTypeName]++;
        } else {
            itemTypesCount[itemTypeName] = 1;
        }

        updateItemCounter();

        var query = "?ngmar=fcl";
        var params = "ajax=fcollect&c=" + rand(10000, 800000);
        var cType = collectableItem.type;
        if (cType == 3) {
            let pt = listPT[rand(0, listPT.length)];
            params += "&newname=" + encodeURI(pt.name) + "&newinfo=" + encodeURI(pt.info);
        }
        return request(params, query);
    };

    var getLuckyNumber = async () => {
        var url = "/user/0/";
        var response = await fetch(url);
        var data = await response.text();
        var matches = data.match(/Vận khí.*?<span.*?>.*?(\d+)/s);
        lucky = matches.length > 1 ? parseInt(matches[1]) : 1;
        var waitTime = (lucky < 50 ? 10 : lucky < 150 ? 6 : lucky < 250 ? 4 : 2) * 60 * 1000;
        window.clearInterval(intervalId);
        startInterval(waitTime);
    };

    var addPageCount = function () {
        var query = '?ngmar=readcounter'
        var params = "sajax=read";
        return request(params, query);
    }

    var startInterval = (waitTime) => {
        intervalId = window.setInterval(() => {
            if (count == 10) {
                window.location.reload();
                return
            }
            addPageCount();
            setTimeout(async () => {
                startCollectItem();
            }, rand(10, 50) * 1000);
        }, waitTime);
    };

    startCollectItem();
    getLuckyNumber();

    // var addOnlineTime = function () {
    //     var url = '/index.php?ngmar=ol2';
    //     var params = "sajax=online&ngmar=ol";
    //     return request(params, url);
    // }

    // var userid;
    // var addOnlineTimeInterval = () => {
    //     window.setInterval(() => {
    //         addOnlineTime();
    //     }, 5 * 60 * 1000);
    //     window.setInterval(() => {
    //         addPageCount();
    //     }, 4 * 60 * 1000);
    // };

    // addOnlineTimeInterval();





    // Tạo thẻ div và thêm vào body
    var itemCounterDiv = document.createElement('div');
    itemCounterDiv.id = 'item-counter';
    itemCounterDiv.style = 'width: 320px;height: 340px;position: fixed;bottom: 0;left: 0;border: 1px solid rgb(122, 199, 241);border-radius: 5px;box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);padding: 15px;background-color: #f9f9f9;margin: 10px;display: block;white-space: pre-line;';
    document.body.appendChild(itemCounterDiv);


    updateItemCounter();

    setInterval(() => {
        updateItemCounter();
    }, 1000);

    // Tạo nút reset và thêm vào body
    var resetCreateButton = document.createElement('button');
    resetCreateButton.id = 'btn-reset-create';
    resetCreateButton.textContent = 'Reset';
    resetCreateButton.style = 'position: fixed; bottom: 360px; left: 10px; padding: 5px 10px; background-color: #ff4d4d; color: white; border: none; border-radius: 3px; cursor: pointer;';
    document.body.appendChild(resetCreateButton);



    // Hàm reset dữ liệu
    resetCreateButton.addEventListener('click', () => {
        itemCount = 0;
        startTime = null;
        localStorage.removeItem('itemCount');
        localStorage.removeItem('startTime');
        updateItemCounter();
        for (let key in itemTypesCount) {
            itemTypesCount[key] = 0;
        }
    });

})();