// Мешканець кімнати
class Resident {
    constructor(
        public fullName: string,
        public birthDate: string,
        public faculty: string,
        public group: string,
        public educationType: string 
    ) {}

    getMonthlyFee(): number {
        return this.educationType === "state" ? 500 : 800; 
    }

    getInfo(): string {
        return `
            ПІБ: ${this.fullName}
            Дата народження: ${this.birthDate}
            Факультет: ${this.faculty}
            Група: ${this.group}
            Форма навчання: ${this.educationType === "state" ? "Державне замовлення" : "Контракт"}
            Квартплата: ${this.getMonthlyFee()} грн
        `;
    }
}

// Кімната
class Room {
    public residents: Resident[] = [];
    public isCloned: boolean = false; 

    constructor(public type: string) {}

    clone(): Room {
        const newRoom = new Room(this.type);
        newRoom.isCloned = true; 
        this.residents.forEach((resident) => {
            const newResident = new Resident(
                resident.fullName,
                resident.birthDate,
                resident.faculty,
                resident.group,
                resident.educationType
            );
            newRoom.residents.push(newResident);
        });
        return newRoom;
    }

    addResident(resident: Resident): void {
        if (
            (this.type === "double" && this.residents.length >= 2) ||
            (this.type === "triple" && this.residents.length >= 3)
        ) {
            throw new Error("Кімната заповнена");
        }
        this.residents.push(resident);
    }

    generateReport(): string {
        const reportHeader = `Тип кімнати: ${
            this.type === "double" ? "Двомісна" : "Тримісна"
        } (Мешканців: ${this.residents.length})\n`;
        const reportBody = this.residents
            .map((r, index) => `Мешканець ${index + 1}:\n${r.getInfo()}`)
            .join("\n\n");
        return reportHeader + reportBody;
    }
}



const rooms: Room[] = []; 

document.getElementById("addResidentBtn")?.addEventListener("click", function () {
    const roomType = (document.getElementById("roomType") as HTMLSelectElement).value;
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const birthDate = (document.getElementById("birthDate") as HTMLInputElement).value;
    const faculty = (document.getElementById("faculty") as HTMLInputElement).value;
    const group = (document.getElementById("group") as HTMLInputElement).value;
    const educationType = (document.getElementById("educationType") as HTMLSelectElement).value;

    if (!fullName || !birthDate || !faculty || !group) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }

    try {
        const room = roomType === "double" ? new Room("double") : new Room("triple");
        const resident = new Resident(fullName, birthDate, faculty, group, educationType);
        room.addResident(resident);

        rooms.push(room); 
        const report = room.generateReport();
        (document.getElementById("report") as HTMLElement).textContent = report;
    } catch (e: any) {
        alert(e.message);
    }
});



function updateRoomsList(): void {
    const roomsList = document.getElementById("roomsList") as HTMLElement;
    roomsList.innerHTML = ""; 

    rooms.forEach((room, index) => {
        const roomDiv = document.createElement("div");
        roomDiv.innerHTML = `
            <p>Кімната ${index + 1}: ${room.type === "double" ? "Двомісна" : "Тримісна"} ${
            room.isCloned ? "(Клонована)" : "(Оригінал)"
        }</p>
            <button id="downloadRoom${index}">Завантажити звіт</button>
            <button id="cloneRoom${index}">Дублювати кімнату</button>
        `;
        roomsList.appendChild(roomDiv);

    
        document
            .getElementById(`downloadRoom${index}`)
            ?.addEventListener("click", () => downloadReport(room));

        
        document
            .getElementById(`cloneRoom${index}`)
            ?.addEventListener("click", () => {
                const clonedRoom = room.clone();
                rooms.push(clonedRoom);
                updateRoomsList(); 
                alert("Кімнату успішно дубльовано!");
            });
    });
}


function downloadReport(room: Room): void {
    if (!room.isCloned) {
        alert("Завантаження звіту дозволено лише для клонованих кімнат.");
        return;
    }

    const reportContent = room.generateReport();
    const blob = new Blob([reportContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `room_report_${room.type}.txt`;
    link.click();
}



document.getElementById("addResidentBtn")?.addEventListener("click", function () {
    const roomType = (document.getElementById("roomType") as HTMLSelectElement).value;
    const fullName = (document.getElementById("fullName") as HTMLInputElement).value;
    const birthDate = (document.getElementById("birthDate") as HTMLInputElement).value;
    const faculty = (document.getElementById("faculty") as HTMLInputElement).value;
    const group = (document.getElementById("group") as HTMLInputElement).value;
    const educationType = (document.getElementById("educationType") as HTMLSelectElement).value;

    if (!fullName || !birthDate || !faculty || !group) {
        alert("Будь ласка, заповніть усі поля.");
        return;
    }

    try {
        const room = roomType === "double" ? new Room("double") : new Room("triple");
        const resident = new Resident(fullName, birthDate, faculty, group, educationType);
        room.addResident(resident);

        rooms.push(room); 
        updateRoomsList(); 
    } catch (e: any) {
        alert(e.message);
    }
});



