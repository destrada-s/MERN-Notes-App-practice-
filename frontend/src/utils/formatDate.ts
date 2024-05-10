export function formatDate(dateString: string)
{
    console.log("hello");
    return new Date(dateString).toLocaleString("es-ES", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    })
}