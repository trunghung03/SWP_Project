﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Subdiamond
{
    public int DiamondId { get; set; }

    public int? DiamondAtrributeId { get; set; }

    public int AmountAvailable { get; set; }

    public decimal Price { get; set; }

    public bool Status { get; set; }

    public virtual Diamondattribute DiamondAtrribute { get; set; }
}