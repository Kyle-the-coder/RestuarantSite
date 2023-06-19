

const AdminLandingView = () => {
    return (
        <div>
            <h1>welcome to admin page</h1>

            <h1 className="underline text-sky-600">logout</h1>

            <div className="w-full bg-slate-200 flex justify-center">
                <div className="w-[400px] flex flex-col bg-slate-800 text-white px-4 py-6">
                    <form className="flex-col flex">
                        <h1 className="fontWriting">Add a Menu Item</h1>
                        <label>Menu Item Name:</label>
                        <input type="text" />
                        <label>Menu Item Description:</label>
                        <input type="text" />
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AdminLandingView;