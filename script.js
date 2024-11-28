var _a, _b;
// Мешканець кімнати
var Resident = /** @class */ (function () {
    function Resident(fullName, birthDate, faculty, group, educationType // "state" або "private"
    ) {
        this.fullName = fullName;
        this.birthDate = birthDate;
        this.faculty = faculty;
        this.group = group;
        this.educationType = educationType;
    }
    Resident.prototype.getMonthlyFee = function () {
        return this.educationType === "state" ? 500 : 800; // Різна квартплата
    };
    Resident.prototype.getInfo = function () {
        return "\n            \u041F\u0406\u0411: ".concat(this.fullName, "\n            \u0414\u0430\u0442\u0430 \u043D\u0430\u0440\u043E\u0434\u0436\u0435\u043D\u043D\u044F: ").concat(this.birthDate, "\n            \u0424\u0430\u043A\u0443\u043B\u044C\u0442\u0435\u0442: ").concat(this.faculty, "\n            \u0413\u0440\u0443\u043F\u0430: ").concat(this.group, "\n            \u0424\u043E\u0440\u043C\u0430 \u043D\u0430\u0432\u0447\u0430\u043D\u043D\u044F: ").concat(this.educationType === "state" ? "Державне замовлення" : "Контракт", "\n            \u041A\u0432\u0430\u0440\u0442\u043F\u043B\u0430\u0442\u0430: ").concat(this.getMonthlyFee(), " \u0433\u0440\u043D\n        ");
    };
    return Resident;
}());
// Кімната
var Room = /** @class */ (function () {
    function Room(type) {
        this.type = type;
        this.residents = [];
        this.isCloned = false; // Вказує, чи кімната є клонованою
    }
    Room.prototype.clone = function () {
        var newRoom = new Room(this.type);
        newRoom.isCloned = true; // Позначаємо нову кімнату як клоновану
        this.residents.forEach(function (resident) {
            var newResident = new Resident(resident.fullName, resident.birthDate, resident.faculty, resident.group, resident.educationType);
            newRoom.residents.push(newResident);
        });
        return newRoom;
    };
    Room.prototype.addResident = function (resident) {
        if ((this.type === "double" && this.residents.length >= 2) ||
            (this.type === "triple" && this.residents.length >= 3)) {
            throw new Error("Кімната заповнена");
        }
        this.residents.push(resident);
    };
    Room.prototype.generateReport = function () {
        var reportHeader = "\u0422\u0438\u043F \u043A\u0456\u043C\u043D\u0430\u0442\u0438: ".concat(this.type === "double" ? "Двомісна" : "Тримісна", " (\u041C\u0435\u0448\u043A\u0430\u043D\u0446\u0456\u0432: ").concat(this.residents.length, ")\n");
        var reportBody = this.residents
            .map(function (r, index) { return "\u041C\u0435\u0448\u043A\u0430\u043D\u0435\u0446\u044C ".concat(index + 1, ":\n").concat(r.getInfo()); })
            .join("\n\n");
        return reportHeader + reportBody;
    };
    return Room;
}());
var rooms = []; // Масив для зберігання кімнат
(_a = document.getElementById("addResidentBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () {
    var roomType = document.getElementById("roomType").value;
    var fullName = document.getElementById("fullName").value;
    var birthDate = document.getElementById("birthDate").value;
    var faculty = document.getElementById("faculty").value;
    var group = document.getElementById("group").value;
    var educationType = document.getElementById("educationType").value;
    if (!fullName || !birthDate || !faculty || !group) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }
    try {
        var room = roomType === "double" ? new Room("double") : new Room("triple");
        var resident = new Resident(fullName, birthDate, faculty, group, educationType);
        room.addResident(resident);
        rooms.push(room); // Додаємо кімнату до масиву
        var report = room.generateReport();
        document.getElementById("report").textContent = report;
    }
    catch (e) {
        alert(e.message);
    }
});
// Обробник події для дублювання кімнати
// Масив для зберігання кімнат (оригінальних і клонованих)
// Функція для оновлення списку кімнат
function updateRoomsList() {
    var roomsList = document.getElementById("roomsList");
    roomsList.innerHTML = ""; // Очищуємо список перед оновленням
    rooms.forEach(function (room, index) {
        var _a, _b;
        var roomDiv = document.createElement("div");
        roomDiv.innerHTML = "\n            <p>\u041A\u0456\u043C\u043D\u0430\u0442\u0430 ".concat(index + 1, ": ").concat(room.type === "double" ? "Двомісна" : "Тримісна", " ").concat(room.isCloned ? "(Клонована)" : "(Оригінал)", "</p>\n            <button id=\"downloadRoom").concat(index, "\">\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0437\u0432\u0456\u0442</button>\n            <button id=\"cloneRoom").concat(index, "\">\u0414\u0443\u0431\u043B\u044E\u0432\u0430\u0442\u0438 \u043A\u0456\u043C\u043D\u0430\u0442\u0443</button>\n        ");
        roomsList.appendChild(roomDiv);
        // Додаємо обробник для завантаження звіту
        (_a = document
            .getElementById("downloadRoom".concat(index))) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function () { return downloadReport(room); });
        // Додаємо обробник для дублювання кімнати
        (_b = document
            .getElementById("cloneRoom".concat(index))) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
            var clonedRoom = room.clone();
            rooms.push(clonedRoom);
            updateRoomsList(); // Оновлюємо список після дублювання
            alert("Кімнату успішно дубльовано!");
        });
    });
}
// Функція для завантаження текстового файлу
function downloadReport(room) {
    if (!room.isCloned) {
        alert("Завантаження звіту дозволено лише для клонованих кімнат.");
        return;
    }
    var reportContent = room.generateReport();
    var blob = new Blob([reportContent], { type: "text/plain" });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "room_report_".concat(room.type, ".txt");
    link.click();
}
// Додавання кімнати
(_b = document.getElementById("addResidentBtn")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    var roomType = document.getElementById("roomType").value;
    var fullName = document.getElementById("fullName").value;
    var birthDate = document.getElementById("birthDate").value;
    var faculty = document.getElementById("faculty").value;
    var group = document.getElementById("group").value;
    var educationType = document.getElementById("educationType").value;
    if (!fullName || !birthDate || !faculty || !group) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }
    try {
        var room = roomType === "double" ? new Room("double") : new Room("triple");
        var resident = new Resident(fullName, birthDate, faculty, group, educationType);
        room.addResident(resident);
        rooms.push(room); // Додаємо кімнату до масиву
        updateRoomsList(); // Оновлюємо список кімнат
    }
    catch (e) {
        alert(e.message);
    }
});
