 const getCurrentDateTime=()=> {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1;
    month = month < 10 ? '0' + month : month; // Thêm số 0 trước tháng nếu cần
    let day = currentDate.getDate();
    day = day < 10 ? '0' + day : day; // Thêm số 0 trước ngày nếu cần
    let hours = currentDate.getHours();
    hours = hours < 10 ? '0' + hours : hours; // Thêm số 0 trước giờ nếu cần
    let minutes = currentDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes; // Thêm số 0 trước phút nếu cần
    let seconds = currentDate.getSeconds();
    seconds = seconds < 10 ? '0' + seconds : seconds; // Thêm số 0 trước giây nếu cần
    let milliseconds = currentDate.getMilliseconds();
    let formattedMilliseconds = milliseconds < 10 ? '00' + milliseconds : milliseconds < 100 ? '0' + milliseconds : milliseconds;

    // Format: YYYY-MM-DDTHH:MM:SS.MMMZ (ví dụ: 2024-03-06T04:01:02.481Z)
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${formattedMilliseconds}Z`;
    
    return formattedDateTime;
}
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }
export {getCurrentDateTime, formatDate}