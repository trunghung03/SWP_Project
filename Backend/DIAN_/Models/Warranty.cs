﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Warranty
{
    public int OrderDetailId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }

    public bool Status { get; set; }

    public virtual Orderdetail OrderDetail { get; set; }
}