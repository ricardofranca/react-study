using System;
using System.ComponentModel.DataAnnotations;

namespace ReactTest.Models
{
    public class Client
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }
    }
}