document.getElementById('cron-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const command = document.getElementById('command').value;
    const schedule = document.getElementById('schedule').value;
    
    alert(`Cron job created!\nCommand: ${command}\nSchedule: ${schedule}`);
    
    // Here, you would normally send the data to your backend server to store and schedule the cron job
});
