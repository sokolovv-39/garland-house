using GarlandHouse.DataModel.Entity;
using GarlandHouse.DataModel;
using Microsoft.EntityFrameworkCore;
using HouseGarland.DataModel.Entity;
using HouseGarland.DataModel.Repository;

public class OrderRepository : DefaultRepository<Order>
{
    public OrderRepository(ApplicationContext context) :base(context) { }

    public ICollection<Order> GetList()
    {
        return _context.Orders.ToList();
    }

    public async Task<ICollection<Order>> GetListAsync()
    {
        return await _context.Orders
            .Include(x => x.Versions)
            .Include(x => x.UserOrders)
            .ThenInclude(x => x.User)
            .ToListAsync();
    }

    public void Add(Order entity)
    {
        entity.CreatedDate = DateTime.UtcNow;
        entity.UpdatedDate = DateTime.UtcNow;
        _context.Orders.Add(entity);
        _context.SaveChanges();
    }

    public async Task AddAsync(Order entity)
    {
        entity.CreatedDate = DateTime.UtcNow;
        entity.UpdatedDate = DateTime.UtcNow;
        await _context.Orders.AddAsync(entity);
        await _context.SaveChangesAsync();
    }

    public void Update(Order entity)
    {
        entity.UpdatedDate = DateTime.UtcNow;
        _context.SaveChanges();
    }

    public async Task UpdateAsync(Order entity)
    {
        entity.UpdatedDate = DateTime.UtcNow;
        await _context.SaveChangesAsync();
    }

    public async Task<List<Order>> GetOrdersByUserId(int userId)
    {
        return await _context.Orders
            .Include(x => x.Versions)
            .Include(x => x.UserOrders)
            .ThenInclude(x => x.User)
            .Where(order => order.UserOrders.Any(x => x.UserId == userId)).ToListAsync();
    }

    public async Task AddComment(Comment comment)
    {
        comment.CommentDateTime = DateTime.UtcNow;
        await _context.Comments.AddAsync(comment);
        await _context.SaveChangesAsync();
    }

    public async Task<Order?> GetOrderByIdAsync(int Id)
    {
        return await _context.Orders
            .Include(x => x.Comments)
            .ThenInclude(x => x.User)
            .Include(x => x.UserOrders)
            .ThenInclude(x => x.User)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Fringes)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Neons)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Threads)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.BeltLights)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Curtains)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Ropes)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.PvsCables)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Corrugations)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.BoxPvsCabels)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Vagies)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.SolderBoxes)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Screeds_200)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Screeds_480_500)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.RelaysSwitches)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.Montages)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.ElectricShields)
            .Include(x => x.Versions)
            .ThenInclude(x => x.Objects)
            .ThenInclude(x => x.ObjectFiles)
            .ThenInclude(x => x.FileEntity)
            .Include(x => x.Reports)
            .ThenInclude(x => x.FileEntity)
            .FirstOrDefaultAsync(x => x.Id == Id);
    }

    public async Task DeleteOrder(Order entity)
    {
        _context.Orders.Remove(entity);
        await _context.SaveChangesAsync();
    }

    public async Task AddOrUpdateAsync(Order entity)
    {
        var existingOrder = await _context.Orders
            .FirstOrDefaultAsync(o => o.Id == entity.Id);

        if (existingOrder == null)
        {
            entity.CreatedDate = DateTime.UtcNow;
            entity.UpdatedDate = DateTime.UtcNow;
            await _context.Orders.AddAsync(entity);
        }
        else
        {
            entity.UpdatedDate = DateTime.UtcNow;
            _context.Attach(entity);
            _context.Entry(existingOrder).CurrentValues.SetValues(entity);
        }

        await _context.SaveChangesAsync();
    }
}
