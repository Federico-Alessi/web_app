export async function addPlant(newPlant) {
    const plant = { ...newPlant, id: Date.now().toString() };
    let resetFlag = false
    let message = ''

    try {
        const response = await fetch("http://localhost:5000/plants", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(plant)
        });

        if (response.ok) {
            resetFlag = true
            message = 'Plant added!'
        } else {
            message = 'Something went wrong'
        }

    } catch {
        message = 'Failed to connect to database'
    }

    return { message, resetFlag }
}


export async function editPlant({ editedPlant }) {
    console.log(editedPlant)

    try {
        const response = await fetch(`http://localhost:5000/plants/${editedPlant.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(editedPlant)
        })

        if (response.ok) {
            return 'Plant edited'

        } else {
            return 'Error while editing the plant'
        }

    } catch {
        return 'Error while connecting to the database'
    }
}


export async function removePlant(plant) {

    try {
        const response = await fetch(`http://localhost:5000/plants/${plant.id}`, {
            method: "DELETE"
        });

        if (response.ok) {
            return "Plant removed from database"
        }

    } catch {
        return "Error while connecting to the database"
    }
}


export async function getPlantById(plantId) {
    if (!plantId) return null

    try {
        const response = await fetch(`http://localhost:5000/plants/${plantId}`)
        const plant = await response.json()
        if (response.ok) return plant

    } catch {
        return null
    }

    return null
}