using DIAN_.Services;

namespace DIAN_.Extensions
{
    public class HandleIncompleOrder
    {
        //public void ConfigureHangfireJobs(IRecurringJobManager recurringJobManager, IServiceProvider serviceProvider)
        //{
        //    recurringJobManager.AddOrUpdate(
        //        "CheckIncompleteOrders",
        //        () => CheckIncompleteOrders(serviceProvider),
        //        Cron.Hourly);
        //}

        //public void CheckIncompleteOrders(IServiceProvider serviceProvider)
        //{
        //    using (var scope = serviceProvider.CreateScope())
        //    {
        //        var orderService = scope.ServiceProvider.GetRequiredService<IOrderService>();
        //        orderService.HandleIncompleteOrders();
        //    }
        //}
    }
}
