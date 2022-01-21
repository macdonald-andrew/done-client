import endpoints from './endpoints'

class ApiClient {
    constructor(axios) {
        this.axios = axios
    }

    signUp(email, password) {
        return this.axios.post(endpoints.signUp, { email, password })
    }

    signIn(email, password) {
        return this.axios.post(endpoints.signIn, { email, password })
    }

    fetchUser() {
        return this.axios.get(endpoints.fetchUser)
    }

    signOut() {
        return this.axios.post(endpoints.signOut, {})
    }

    createProfile(firstName, lastName, dob, phoneNumber) {
        return this.axios.post(endpoints.createProfile, { firstName, lastName, dob, phoneNumber })
    }

    saveAddress(address, placeId, location) {
        return this.axios.post(endpoints.saveAddress, { address, placeId, location })
    }

    uploadLicense(file, setProgress = () => {}) {
        const formData = new FormData()
        formData.append('file', file)

        const onUploadProgress = (evt) => {
            const currentProgress = Math.round((100 * evt.loaded) / evt.total)
            setProgress(currentProgress)
        }

        return this.axios.post(endpoints.license, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
            onUploadProgress
        })
    }

    createAppointment(appointment) {
        return this.axios.post(endpoints.appointment, { appointment })
    }

    getPatients() {
        return this.axios.get(endpoints.getPatients)
    }
}

export default ApiClient