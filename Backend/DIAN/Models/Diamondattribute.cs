﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Diamondattribute
{
    public int DiamondAtrributeId { get; set; }

    public string Shape { get; set; }

    public string Color { get; set; }

    public string Clarity { get; set; }

    public decimal Carat { get; set; }

    public string Cut { get; set; }

    public virtual ICollection<Diamond> Diamonds { get; set; } = new List<Diamond>();

    public virtual ICollection<Product> ProductMainDiamondAtrributes { get; set; } = new List<Product>();

    public virtual ICollection<Product> ProductSubDiamondAtrributes { get; set; } = new List<Product>();

    public virtual ICollection<Subdiamond> Subdiamonds { get; set; } = new List<Subdiamond>();
}