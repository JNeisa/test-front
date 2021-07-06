using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test1.DB;

namespace Test1.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        private readonly ContactUsContext repositoryContext;

        public Repository(ContactUsContext repositoryContext)
        {
            this.repositoryContext = repositoryContext;
        }

        public IQueryable<TEntity> GetAll()
        {
            return repositoryContext.Set<TEntity>();
        }

        public void AddEntity(TEntity entity)
        {
            repositoryContext.Add<TEntity>(entity);
            repositoryContext.SaveChanges();
        }
    }
}
