document.getElementById('numLines').addEventListener('change', createInputFields);

function createInputFields() {
    const numLines = document.getElementById('numLines').value;
    const inputDiv = document.getElementById('traverseInputs');
    
    // Clear previous inputs
    inputDiv.innerHTML = '';

    // Create inputs for bearings and distances based on number of lines
    for (let i = 1; i <= numLines; i++) {
        inputDiv.innerHTML += `
            <label for="bearing${i}">Bearing ${i} (degrees):</label>
            <input type="number" id="bearing${i}" name="bearing${i}" step="0.01" required>
            
            <label for="distance${i}">Distance ${i} (meters):</label>
            <input type="number" id="distance${i}" name="distance${i}" step="0.01" required><br><br>
        `;
    }
}

function computeTraverse() {
    const numLines = document.getElementById('numLines').value;
    let initialEasting = parseFloat(document.getElementById('easting').value);
    let initialNorthing = parseFloat(document.getElementById('northing').value);

    let currentEasting = initialEasting;
    let currentNorthing = initialNorthing;

    // Clear previous table results
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';

    for (let i = 1; i <= numLines; i++) {
        // Get bearing and distance values
        let bearing = parseFloat(document.getElementById(`bearing${i}`).value);
        let distance = parseFloat(document.getElementById(`distance${i}`).value);
        
        // Convert bearing to radians
        let bearingRad = (bearing * Math.PI) / 180;
        
        // Compute deltaE (change in Easting) and deltaN (change in Northing)
        let deltaE = distance * Math.sin(bearingRad);
        let deltaN = distance * Math.cos(bearingRad);

        // Update the coordinates
        currentEasting += deltaE;
        currentNorthing += deltaN;

        // Insert new row in the table with the computed values
        let row = `
            <tr>
                <td>${i}</td>
                <td>${bearing.toFixed(2)}</td>
                <td>${distance.toFixed(2)}</td>
                <td>${deltaE.toFixed(2)}</td>
                <td>${deltaN.toFixed(2)}</td>
                <td>${currentEasting.toFixed(2)}</td>
                <td>${currentNorthing.toFixed(2)}</td>
            </tr>
        `;
        tableBody.innerHTML += row;
    }
}
