package world.moducare.domain.challenge.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallenge is a Querydsl query type for Challenge
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallenge extends EntityPathBase<Challenge> {

    private static final long serialVersionUID = 231757119L;

    public static final QChallenge challenge = new QChallenge("challenge");

    public final ListPath<world.moducare.domain.challengefeed.entity.ChallengeFeed, world.moducare.domain.challengefeed.entity.QChallengeFeed> challengeFeeds = this.<world.moducare.domain.challengefeed.entity.ChallengeFeed, world.moducare.domain.challengefeed.entity.QChallengeFeed>createList("challengeFeeds", world.moducare.domain.challengefeed.entity.ChallengeFeed.class, world.moducare.domain.challengefeed.entity.QChallengeFeed.class, PathInits.DIRECT2);

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final NumberPath<Integer> headCount = createNumber("headCount", Integer.class);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final ListPath<world.moducare.domain.mychallenge.entity.MyChallenge, world.moducare.domain.mychallenge.entity.QMyChallenge> myChallenges = this.<world.moducare.domain.mychallenge.entity.MyChallenge, world.moducare.domain.mychallenge.entity.QMyChallenge>createList("myChallenges", world.moducare.domain.mychallenge.entity.MyChallenge.class, world.moducare.domain.mychallenge.entity.QMyChallenge.class, PathInits.DIRECT2);

    public final StringPath title = createString("title");

    public QChallenge(String variable) {
        super(Challenge.class, forVariable(variable));
    }

    public QChallenge(Path<? extends Challenge> path) {
        super(path.getType(), path.getMetadata());
    }

    public QChallenge(PathMetadata metadata) {
        super(Challenge.class, metadata);
    }

}

