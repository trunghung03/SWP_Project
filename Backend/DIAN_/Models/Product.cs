﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable disable
using System;
using System.Collections.Generic;

namespace DIAN_.Models;

public partial class Product
{
    public int ProId { get; set; }

    public string ProCode { get; set; }

    public string Name { get; set; }

    public decimal Price { get; set; }

    public string Description { get; set; }

    public int MainDiamondId { get; set; }

    public decimal ChargeUp { get; set; }

    public decimal LaborPrice { get; set; }

    public string ImageLinkList { get; set; }

    public int SubDiamondAmount { get; set; }

    public bool Status { get; set; }

    public virtual Diamond MainDiamond { get; set; }

    public virtual ICollection<Orderdetail> Orderdetails { get; set; } = new List<Orderdetail>();

    public virtual ICollection<Productcategory> Productcategories { get; set; } = new List<Productcategory>();


}