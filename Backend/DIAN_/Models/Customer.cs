﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Customer
{
    public int CustomerId { get; set; }

    public string Email { get; set; }

    public string Password { get; set; }

    public string LastName { get; set; }

    public string FirstName { get; set; }

    public string Address { get; set; }

    public string PhoneNumber { get; set; }

    public long? Points { get; set; }

    public bool Status { get; set; }

    public virtual ICollection<Purchaseorder> Purchaseorders { get; set; } = new List<Purchaseorder>();
}