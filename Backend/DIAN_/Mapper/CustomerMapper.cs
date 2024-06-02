using DIAN_.DTOs.AccountDTO;
using DIAN_.DTOs.WarrantyDTO;
using DIAN_.Models;

namespace DIAN_.Mapper
{
    public static class CustomerMapper
    {
        public static Customer ToCustomerFromUpdatePoint(this UpdateCustomerPointDto customerPoint)
        {
            return new Customer
            {
               Points = customerPoint.Point
            };
        }
    }
}
