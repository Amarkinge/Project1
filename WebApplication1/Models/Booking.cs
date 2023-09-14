using System.ComponentModel.DataAnnotations;
namespace Project1.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public int UserId { get; set; }
        public int BusId { get; set; }
        public User User { get; set; }
        public Bus Bus { get; set; }
        [Required]
        public DateTime BookingDate { get; set; }
        public bool IsCancelled { get; internal set; }
        public DateTime DepartureDate { get; set; }
        public int PassengerCount { get; set; }
        public DateTime? ReturnDate { get; set; }
        public DateTime CancelledAt { get; internal set; }
        public DateTime CreatedAt { get; internal set; }
    }
}
