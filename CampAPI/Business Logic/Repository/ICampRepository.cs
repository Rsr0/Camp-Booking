using DataAccess.Entities;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BusinessLogic.Repository
{
    public interface ICampRepository
    {
        Task<Camp> addCamp([FromBody] Camp campRequest);
        Task<Camp> deleteCamp([FromRoute] Guid id);
        Task<List<Camp>> filterCamps();
        Task<List<Camp>> getAllCamps();
        Task<Camp> getCamp([FromRoute] Guid id);
        Task<List<Camp>> searchBooking(DateTime CheckIN, DateTime CheckOUT, int capacity);
        Task<Camp> updateCamp([FromRoute] Guid id, Camp campRequest);
    }
}