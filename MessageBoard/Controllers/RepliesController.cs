using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using MessageBoard.Data;

namespace MessageBoard.Controllers
{
  [RoutePrefix("api/topics/{topicid}/replies")]
  public class RepliesController : ApiController
  {
    private IMessageBoardRepository _repo;
    public RepliesController(IMessageBoardRepository repo)
    {
      _repo = repo;
    }

    [Route("")]
    public IEnumerable<Reply> Get(int topicId)
    {
      return _repo.GetRepliesByTopic(topicId);
    }

    [Route("{id}", Name = "ReplyRoute")]
    public Reply Get(int topicId, int id)
    {
      var query = _repo.GetRepliesByTopic(topicId);

      return query.Where(r => r.Id == id).FirstOrDefault();
    }

    [Route("")]
    public IHttpActionResult Post(int topicId, [FromBody]Reply newReply)
    {
      if (newReply.Created == default(DateTime))
      {
        newReply.Created = DateTime.UtcNow;
      }

      newReply.TopicId = topicId;

      if (_repo.AddReply(newReply) &&
          _repo.Save())
      {
        return this.CreatedAtRoute("ReplyRoute", new { topicId = newReply.TopicId, id = newReply.Id }, newReply);
      }

      return BadRequest();
    }
  }
}
