
const Building = {
    floors: 10,
    area: 5000, 
    communications: {
      electricity: true,
      waterSupply: true,
      gas: false
    },
  
    
    getTechnicalDetails() {
      return `
        <h2>Технічні характеристики</h2>
        <p>Кількість поверхів: ${this.floors}</p>
        <p>Площа: ${this.area} кв.м</p>
        <ul class="comm-list">
          <li class="${this.communications.electricity ? '' : 'unavailable'}">Електрика: ${this.communications.electricity ? 'Так' : 'Ні'}</li>
          <li class="${this.communications.waterSupply ? '' : 'unavailable'}">Водопостачання: ${this.communications.waterSupply ? 'Так' : 'Ні'}</li>
          <li class="${this.communications.gas ? '' : 'unavailable'}">Газ: ${this.communications.gas ? 'Так' : 'Ні'}</li>
        </ul>
      `;
    }
  };
  
  
  const Owner = {
    companyName: 'ТОВ "Будівельник"',
    address: 'м. Київ, вул. Незалежності, 1',
  
    
    getOwnerDetails() {
      return `
        <h2>Інформація про власника</h2>
        <p>Назва підприємства: ${this.companyName}</p>
        <p>Адреса: ${this.address}</p>
      `;
    }
  };
  
  
  const BuildingInfo = {
    building: Building,
    owner: Owner,
  
    
    getFullInfo() {
      return `
        ${this.building.getTechnicalDetails()}
        ${this.owner.getOwnerDetails()}
      `;
    }
  };
  
  
  document.getElementById('building-info').innerHTML = BuildingInfo.getFullInfo();
  