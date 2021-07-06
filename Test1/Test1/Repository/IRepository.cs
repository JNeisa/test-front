using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Test1.Repository
{
    public interface IRepository<TEntity>
    {
        void AddEntity(TEntity entity);
        IQueryable<TEntity> GetAll();
    }
}
