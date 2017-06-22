using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ReactTest.DTO
{
    public class ClientInsertDTO
    {
        [Required]
        public string Name { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        //public ICollection<DependentInsertDTO> Dependents { get; set; }
    }
}