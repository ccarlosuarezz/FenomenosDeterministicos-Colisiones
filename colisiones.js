const xPosition = document.getElementById('input_x');
const yPosition = document.getElementById('input_y');
const speed = document.getElementById('input_speed');
const direction = document.getElementById('input_dir');
const time = document.getElementById('input_time');
const nVehicle = document.getElementById('n_vehicle');
const result = document.getElementById('result');

const table = document.getElementById('vehicle_list');

const addButton = document.getElementById('add_button');
const simButton = document.getElementById('sim_button');

let vehicleList = [];
let n = 0;

addButton.addEventListener("click", addMovil);
simButton.addEventListener("click", simulation);

function addMovil() {
    if (n == 0) {
        table.innerHTML = '';
    }
    n++;
    let x = xPosition.value;
    let y = yPosition.value;
    let vehicle_speed = speed.value;
    let vehicle_direction = direction.value;
    if (x == '' && y == '' && vehicle_speed == '' && vehicle_direction == '') {
        window.alert('No ha ingresado todos los parametros');
    } else {
        const newRow = document.createElement('tr');
        const tdN = document.createElement('td');
        const tdXPos = document.createElement('td');
        const tdYPos = document.createElement('td');
        const tdSpeed = document.createElement('td');
        const tdDirection = document.createElement('td');
        tdN.textContent = n;
        tdXPos.textContent = x;
        tdYPos.textContent = y;
        tdSpeed.textContent = vehicle_speed;
        tdDirection.textContent = vehicle_direction;
        newRow.appendChild(tdN);
        newRow.appendChild(tdXPos);
        newRow.appendChild(tdYPos);
        newRow.appendChild(tdSpeed);
        newRow.appendChild(tdDirection);
        table.appendChild(newRow);
        vehicleList.push([x, y, vehicle_speed, vehicle_direction]);
        nVehicle.innerHTML = `<strong>Vehiculo ${n+1}</strong>`;
        console.log(vehicleList);
    }
}

function simulation() {
    let simTime = time.value;
    if (simTime == '') {
        window.alert('No ha definido un tiempo de simulación');
    } else {
        let initialTime = 0;
        let collisions = 0;
        let actualVehicle = [];
        let angle = 0;
        while (initialTime < simTime) {
            for (let i = 0; i < vehicleList.length-1; i++) {
                for (let j = i+1; j < vehicleList.length; j++) {
                    if (vehicleList[i][0] == vehicleList[j][0] && vehicleList[i][1] == vehicleList[j][1]) {
                        collisions++;
                    }
                }
            }
            for (let i = 0; i < vehicleList.length; i++) {
                actualVehicle = vehicleList[i];
                angle = Number(actualVehicle[3] * Math.PI / 180);
                actualVehicle[0] = Math.round(Number(actualVehicle[0]) + Number(actualVehicle[2]) * Math.cos(angle));
                actualVehicle[1] = Math.round(Number(actualVehicle[1]) + Number(actualVehicle[2]) * Math.sin(angle));
                console.log(`Vehiculo ${i}: x=${actualVehicle[0]} - y=${actualVehicle[1]}`);
            }
            initialTime++;
        }
        result.innerHTML = `<strong>Resultado: ${collisions} colisiones</strong>`;
    }
}