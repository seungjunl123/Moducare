package world.moducare.domain.challengefeed.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;
import com.querydsl.core.types.dsl.PathInits;


/**
 * QChallengeFeed is a Querydsl query type for ChallengeFeed
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QChallengeFeed extends EntityPathBase<ChallengeFeed> {

    private static final long serialVersionUID = -1564906465L;

    private static final PathInits INITS = PathInits.DIRECT2;

    public static final QChallengeFeed challengeFeed = new QChallengeFeed("challengeFeed");

    public final world.moducare.domain.challenge.entity.QChallenge challenge;

    public final StringPath content = createString("content");

    public final DateTimePath<java.time.ZonedDateTime> createdAt = createDateTime("createdAt", java.time.ZonedDateTime.class);

    public final ListPath<world.moducare.domain.favorite.entity.Favorite, world.moducare.domain.favorite.entity.QFavorite> favorites = this.<world.moducare.domain.favorite.entity.Favorite, world.moducare.domain.favorite.entity.QFavorite>createList("favorites", world.moducare.domain.favorite.entity.Favorite.class, world.moducare.domain.favorite.entity.QFavorite.class, PathInits.DIRECT2);

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath image = createString("image");

    public final world.moducare.domain.member.entity.QMember member;

    public QChallengeFeed(String variable) {
        this(ChallengeFeed.class, forVariable(variable), INITS);
    }

    public QChallengeFeed(Path<? extends ChallengeFeed> path) {
        this(path.getType(), path.getMetadata(), PathInits.getFor(path.getMetadata(), INITS));
    }

    public QChallengeFeed(PathMetadata metadata) {
        this(metadata, PathInits.getFor(metadata, INITS));
    }

    public QChallengeFeed(PathMetadata metadata, PathInits inits) {
        this(ChallengeFeed.class, metadata, inits);
    }

    public QChallengeFeed(Class<? extends ChallengeFeed> type, PathMetadata metadata, PathInits inits) {
        super(type, metadata, inits);
        this.challenge = inits.isInitialized("challenge") ? new world.moducare.domain.challenge.entity.QChallenge(forProperty("challenge")) : null;
        this.member = inits.isInitialized("member") ? new world.moducare.domain.member.entity.QMember(forProperty("member")) : null;
    }

}

