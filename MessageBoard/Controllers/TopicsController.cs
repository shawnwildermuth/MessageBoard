using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
  public class TopicsController : ApiController
  {
    private IMessageBoardRepository _repo;
    public TopicsController(IMessageBoardRepository repo)
    {
      _repo = repo;
    }

    public IEnumerable<Topic> Get(bool includeReplies = false)
    {
      IQueryable<Topic> results;

      if (includeReplies == true)
      {
        results = _repo.GetTopicsIncludingReplies();
      }
      else
      {
        results = _repo.GetTopics();
      }

      var topics = results.OrderByDescending(t => t.Created)
                          .Take(25)
                          .ToList();

      return topics;
    }

    // I didn't show this, but this is common
    public HttpResponseMessage Get(int id, bool includeReplies = false)
    {
      IQueryable<Topic> results;

      if (includeReplies == true)
      {
        results = _repo.GetTopicsIncludingReplies();
      }
      else
      {
        results = _repo.GetTopics();
      }

      var topic = results.Where(t => t.Id == id).FirstOrDefault();

      if (topic != null) return Request.CreateResponse(HttpStatusCode.OK, topic);

      return Request.CreateResponse(HttpStatusCode.NotFound);
    }

    public IHttpActionResult Post([FromBody]Topic newTopic)
    {
      if (newTopic.Created == default(DateTime))
      {
        newTopic.Created = DateTime.UtcNow;
      }

      if (_repo.AddTopic(newTopic) &&
          _repo.Save())
      {
        return CreatedAtRoute("DefaultApi", new { id = newTopic.Id }, newTopic);
      }

      return BadRequest("Couldn't save the topic");
    }
  }
}
