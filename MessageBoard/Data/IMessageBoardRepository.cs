using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MessageBoard.Data
{
  public interface IMessageBoardRepository
  {
    IQueryable<Topic> GetTopics();
    IQueryable<Topic> GetTopicsIncludingReplies();
    IQueryable<Reply> GetRepliesByTopic(int topicId);

    bool Save();

    bool AddTopic(Topic newTopic);
    bool AddReply(Reply newReply);

  }
}
