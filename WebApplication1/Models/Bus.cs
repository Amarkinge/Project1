using System.ComponentModel.DataAnnotations;

namespace Project1.Models
{
    public class Bus
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string BusNumber { get; set; }
        public string Name { get; set; }
        public string? Capacity { get; set; }
        public bool IsBooked { get; internal set; }
        public ICollection<Booking> Bookings { get; set; }
    }
}
